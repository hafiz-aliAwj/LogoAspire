"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Edit, Trash2, Save, RotateCcw, Undo, Redo, Grip, Plus, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"


export default function ServiceManager() {
  // State management
  const { toast } = useToast()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingService, setEditingService] = useState(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState(null)
  const [editName, setEditName] = useState("")
  const [newServiceName, setNewServiceName] = useState("")
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [saving, setSaving] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [changesMade, setChangesMade] = useState(0)

  // Track changes
  useEffect(() => {
    if (changesMade > 0) {
      setUnsavedChanges(true)
    }
  }, [changesMade])

  // Fetch services on component mount
  useEffect(() => {
    fetchServices()
  }, [])

  // Fix the fetchServices function to properly handle API responses
  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/service")
      if (!response.ok) throw new Error("Failed to fetch services")

      let data1 = await response.json()
      let data = data1.data

      // Ensure data is an array
      if (!Array.isArray(data)) {
        // If data is an object with a property that contains the array
        if (data && typeof data === "object") {
          // Try to find an array property (common patterns like data.services, data.items, etc.)
          const possibleArrays = Object.values(data).filter((val) => Array.isArray(val))
          if (possibleArrays.length > 0) {
            data = possibleArrays[0]
          } else {
            // If no array found, create an empty array
            console.error("API response is not an array:", data)
            data = []
          }
        } else {
          // If not an object or array, create an empty array
          console.error("API response is not an array:", data)
          data = []
        }
      }

      // Sort services by isActive and order
      const sortedServices = sortServices(data)
      setServices(sortedServices)

      // Reset history when fetching new data
      setHistory([])
      setHistoryIndex(-1)
      setUnsavedChanges(false)
      setChangesMade(0)
    } catch (error) {
      console.error("Error fetching services:", error)
      // Initialize with empty array on error
      setServices([])
      toast({
        title: "Error",
        description: "Failed to load services. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Sort services by isActive and order
  const sortServices = (services) => {
    return [...services].sort((a, b) => {
      // First sort by isActive (true comes first)
      if (a.isActive !== b.isActive) {
        return a.isActive ? -1 : 1
      }
      // Then sort by order for active services
      if (a.isActive && b.isActive) {
        return a.order - b.order
      }
      return 0
    })
  }

  // Add action to history
  const addToHistory = (action) => {
    // If we're not at the end of the history, remove future actions
    if (historyIndex < history.length - 1) {
      setHistory(history.slice(0, historyIndex + 1))
    }

    // Add new action to history
    setHistory([...history.slice(0, historyIndex + 1), action])
    setHistoryIndex(historyIndex + 1)
    setChangesMade((prev) => prev + 1)
  }

  // Undo last action
  const handleUndo = () => {
    if (historyIndex >= 0) {
      const action = history[historyIndex]

      switch (action.type) {
        case "ADD":
          setServices((prevServices) => prevServices.filter((s) => s.id !== action.service.id))
          break
        case "EDIT":
        case "TOGGLE":
          if (action.prevState) {
            setServices((prevServices) =>
              prevServices.map((s) => (s.id === action.service.id ? (action.prevState) : s)),
            )
          }
          break
        case "DELETE":
          if (action.prevState) {
            setServices((prevServices) => [...prevServices, action.service])
          }
          break
        case "REORDER":
          if (action.prevState) {
            setServices(action.prevState)
          }
          break
      }

      setHistoryIndex(historyIndex - 1)

      toast({
        title: "Undone",
        description: `${action.type.charAt(0) + action.type.slice(1).toLowerCase()} action undone`,
        variant: "default",
      })
    }
  }

  // Redo last undone action
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const action = history[historyIndex + 1]

      switch (action.type) {
        case "ADD":
          setServices((prevServices) => [...prevServices, action.service])
          break
        case "EDIT":
        case "TOGGLE":
          setServices((prevServices) => prevServices.map((s) => (s.id === action.service.id ? action.service : s)))
          break
        case "DELETE":
          setServices((prevServices) => prevServices.filter((s) => s.id !== action.service.id))
          break
        case "REORDER":
          setServices((prevServices) => {
            // Find the service being reordered
            const updatedServices = [...prevServices]
            const serviceIndex = updatedServices.findIndex((s) => s.id === action.service.id)

            if (serviceIndex !== -1) {
              // Update the order
              updatedServices[serviceIndex] = action.service
            }

            return sortServices(updatedServices)
          })
          break
      }

      setHistoryIndex(historyIndex + 1)

      toast({
        title: "Redone",
        description: `${action.type.charAt(0) + action.type.slice(1).toLowerCase()} action redone`,
        variant: "default",
      })
    }
  }

  // Reset to initial state
  const handleRestart = () => {
    fetchServices()

    toast({
      title: "Reset",
      description: "All changes have been discarded",
      variant: "default",
    })
  }

  // Toggle service active status
  const toggleServiceActive = (service) => {
    const updatedService = { ...service, isActive: !service.isActive }

    // Add to history before updating
    addToHistory({
      type: "TOGGLE",
      service: updatedService,
      prevState: service,
    })

    // Update services
    setServices((prevServices) => {
      const updated = prevServices.map((s) => (s.id === service.id ? updatedService : s))
      return sortServices(updated)
    })

    toast({
      title: `Service ${updatedService.isActive ? "Activated" : "Deactivated"}`,
      description: `"${service.name}" is now ${updatedService.isActive ? "active" : "inactive"}`,
      variant: "default",
    })
  }

  // Open edit dialog
  const openEditDialog = (service) => {
    setEditingService(service)
    setEditName(service.name)
    setEditDialogOpen(true)
  }

  // Save edited service name
  const saveEditedService = () => {
    if (editingService && editName.trim()) {
      const updatedService = { ...editingService, name: editName.trim() }

      // Add to history before updating
      addToHistory({
        type: "EDIT",
        service: updatedService,
        prevState: editingService,
      })

      // Update services
      setServices((prevServices) => prevServices.map((s) => (s.id === editingService.id ? updatedService : s)))

      setEditDialogOpen(false)
      setEditingService(null)

      toast({
        title: "Service Updated",
        description: `Service name updated to "${updatedService.name}"`,
        variant: "default",
      })
    }
  }

  // Open delete confirmation dialog
  const confirmDeleteService = (service) => {
    console.log(service, 1)
    setServiceToDelete(service)
    setDeleteDialogOpen(true)
  }

  // Delete service after confirmation
  const deleteService = () => {
    console.log(serviceToDelete, 2)
    if (serviceToDelete) {
      // Add to history before deleting
      addToHistory({
        type: "DELETE",
        service: serviceToDelete,
        prevState: serviceToDelete,
      })

      // Update services - only filter out the specific service to delete
      setServices((prevServices) => prevServices.filter((s) => s.id !== serviceToDelete.id))

      toast({
        title: "Service Deleted",
        description: `"${serviceToDelete.name}" has been removed`,
        variant: "default",
      })

      setDeleteDialogOpen(false)
      setServiceToDelete(null)
    }
  }

  // Add new service
  const addNewService = () => {
    if (newServiceName.trim()) {
      // Create a new service with a temporary ID
      const newService = {
        id: `temp-${Date.now()}`, // Temporary ID until saved to backend
        name: newServiceName.trim(),
        order: activeServices.length + 1,
        isActive: true,
      }

      // Add to history
      addToHistory({
        type: "ADD",
        service: newService,
      })

      // Update services
      setServices((prevServices) => sortServices([...prevServices, newService]))

      // Reset and close dialog
      setNewServiceName("")
      setAddDialogOpen(false)

      toast({
        title: "Service Added",
        description: `"${newService.name}" has been added`,
        variant: "default",
      })
    }
  }

  // Handle drag and drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index

    // Only allow reordering within active services
    const activeServices = services.filter((s) => s.isActive)

    if (
      sourceIndex === destinationIndex ||
      sourceIndex >= activeServices.length ||
      destinationIndex >= activeServices.length
    ) {
      return
    }

    // Create a copy of services
    const updatedServices = [...services]
    const activeServicesCopy = [...activeServices]

    // Reorder active services
    const [movedService] = activeServicesCopy.splice(sourceIndex, 1)
    activeServicesCopy.splice(destinationIndex, 0, movedService)

    // Update order numbers
    const reorderedActiveServices = activeServicesCopy.map((service, index) => ({
      ...service,
      order: index + 1,
    }))

    // Replace active services in the original array
    const inactiveServices = services.filter((s) => !s.isActive)
    const newServices = [...reorderedActiveServices, ...inactiveServices]

    // Save previous state for undo
    addToHistory({
      type: "REORDER",
      service: movedService,
      prevState: updatedServices,
    })

    // Update services
    setServices(newServices)

    toast({
      title: "Order Updated",
      description: "Service order has been updated",
      variant: "default",
    })
  }

  // Fix the saveChanges function to properly handle API responses
  const saveChanges = async () => {
    setSaving(true)

    try {
      // Track which services need to be created, updated, or deleted
      const response = await fetch("/api/service")
      if (!response.ok) throw new Error("Failed to fetch original services")
      const originalServices = await response.json()

      // Ensure we're working with the data array
      const originalData = originalServices.data || []

      // Find services to create (not in original list)
      const servicesToCreate = services.filter(
        (service) => !originalData.some((original) => original.id === service.id),
      )

      // Find services to update (in both lists but with changes)
      const servicesToUpdate = services.filter((service) => {
        const original = originalData.find((o) => o.id === service.id)
        if (!original) return false

        return (
          original.name !== service.name || original.order !== service.order || original.isActive !== service.isActive
        )
      })

      // Find services to delete (in original but not in current)
      const servicesToDelete = originalData.filter(
        (original) => !services.some((service) => service.id === original.id),
      )

      console.log("Services to delete:", servicesToDelete)

      // Create new services
      const createPromises = servicesToCreate.map((service) =>
        fetch("/api/service", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(service),
        }),
      )

      // Update existing services
      const updatePromises = servicesToUpdate.map((service) =>
        fetch(`/api/service/${service.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(service),
        }),
      )

      // Delete services - use the correct ID field (_id) for the API
      const deletePromises = servicesToDelete.map((service) =>
        fetch(`/api/service/${service._id}`, {
          method: "DELETE",
        }),
      )

      // Wait for all operations to complete
      await Promise.all([...createPromises, ...updatePromises, ...deletePromises])

      toast({
        title: "Changes Saved",
        description: `Successfully saved ${servicesToCreate.length + servicesToUpdate.length + servicesToDelete.length} changes`,
        variant: "success",
      })

      // Refresh services
      fetchServices()
    } catch (error) {
      console.error("Error saving changes:", error)
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  // Render active and inactive services separately
  const activeServices = services.filter((service) => service.isActive)
  const inactiveServices = services.filter((service) => !service.isActive)

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16">
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Service Manager</h1>
            <p className="text-muted-foreground mt-1">Manage, organize, and prioritize your services</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="default"
              onClick={() => setAddDialogOpen(true)}
              className="animate-in fade-in-50 duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleUndo}
                disabled={historyIndex < 0}
                title="Undo"
                className="h-9 w-9"
              >
                <Undo className="h-4 w-4" />
                <span className="sr-only">Undo</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                title="Redo"
                className="h-9 w-9"
              >
                <Redo className="h-4 w-4" />
                <span className="sr-only">Redo</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleRestart}
                title="Reset all changes"
                className="h-9 w-9"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="sr-only">Restart</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        {unsavedChanges && (
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 rounded-lg px-4 py-3 mb-6 flex items-center justify-between animate-in fade-in-0 slide-in-from-top-5 duration-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>You have unsaved changes</span>
            </div>
            <Button
              onClick={saveChanges}
              disabled={loading || saving}
              size="sm"
              variant="default"
              className="bg-amber-600 hover:bg-amber-700 text-white dark:text-white border-none"
            >
              {saving ? "Saving..." : "Save Now"}
            </Button>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="h-5 w-8" />
                        <Skeleton className="h-5 w-40" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-5 w-10 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-5 w-8" />
                        <Skeleton className="h-5 w-40" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-5 w-10 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="overflow-hidden border shadow-sm">
              <CardHeader className="bg-background pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    Active Services
                    <Badge variant="default" className="ml-2">
                      {activeServices.length}
                    </Badge>
                  </div>
                </CardTitle>
                <CardDescription>Drag to reorder. Active services are displayed to users.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="active-services">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {activeServices.length > 0 ? (
                          activeServices.map((service, index) => (
                            <Draggable key={service.id} draggableId={service.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className={`flex items-center justify-between p-3 border rounded-md transition-all duration-200 ${
                                    snapshot.isDragging
                                      ? "shadow-lg bg-primary/5 scale-[1.02]"
                                      : "bg-background hover:bg-muted/20"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      {...provided.dragHandleProps}
                                      className="cursor-grab hover:text-primary transition-colors"
                                    >
                                      <Grip className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                                      {index + 1}
                                    </div>
                                    <span className="font-medium">{service.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-muted-foreground hover:text-foreground transition-colors"
                                      onClick={() => openEditDialog(service)}
                                    >
                                      <Edit className="h-4 w-4" />
                                      <span className="sr-only">Edit</span>
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-muted-foreground hover:text-destructive transition-colors"
                                      onClick={() => confirmDeleteService(service)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                      <span className="sr-only">Delete</span>
                                    </Button>
                                    <div className="flex items-center gap-2 pl-2">
                                      <Switch
                                        checked={service.isActive}
                                        onCheckedChange={() => toggleServiceActive(service)}
                                        className="data-[state=checked]:bg-green-500"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))
                        ) : (
                          <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-md border border-dashed">
                            <p>No active services</p>
                            <Button variant="link" size="sm" onClick={() => setAddDialogOpen(true)} className="mt-2">
                              Add your first service
                            </Button>
                          </div>
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border shadow-sm">
              <CardHeader className="bg-background pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    Inactive Services
                    <Badge variant="secondary" className="ml-2">
                      {inactiveServices.length}
                    </Badge>
                  </div>
                </CardTitle>
                <CardDescription>Inactive services are hidden from users.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {inactiveServices.length > 0 ? (
                    inactiveServices.map((service, index) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between p-3 border rounded-md 
                                  bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted/30 text-muted-foreground font-medium">
                            {index + 1}
                          </div>
                          <span className="font-medium text-muted-foreground">{service.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => openEditDialog(service)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            onClick={() => confirmDeleteService(service)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                          <div className="flex items-center gap-2 pl-2">
                            <Switch checked={service.isActive} onCheckedChange={() => toggleServiceActive(service)} />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-md border border-dashed">
                      <p>No inactive services</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Actions Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-md z-10 animate-in slide-in-from-bottom-5 duration-300">
          <div className="container mx-auto max-w-5xl flex justify-between items-center">
            <div>
              {unsavedChanges && (
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">{changesMade} changes</span> pending
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleRestart} disabled={loading || !unsavedChanges}>
                Discard Changes
              </Button>
              <Button
                onClick={saveChanges}
                disabled={loading || saving || !unsavedChanges}
                className="min-w-[140px] relative"
              >
                {saving ? (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-background"></div>
                    </div>
                    <span className="opacity-0">Save Changes</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
              <DialogDescription>Update the service details below.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="service-name" className="text-muted-foreground">
                Service Name
              </Label>
              <Input
                id="service-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="mt-2"
                placeholder="Enter service name"
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveEditedService} disabled={!editName.trim()}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Service Dialog */}
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>Enter the details for the new service.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="new-service-name" className="text-muted-foreground">
                Service Name
              </Label>
              <Input
                id="new-service-name"
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
                className="mt-2"
                placeholder="Enter service name"
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addNewService} disabled={!newServiceName.trim()}>
                Add Service
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove "{serviceToDelete?.name}" from your services list. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={deleteService}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

