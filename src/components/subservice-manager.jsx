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

export default function SubserviceManager({ parentService }) {
  // State management
  const { toast } = useToast()
  const [subservices, setSubservices] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingSubservice, setEditingSubservice] = useState(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [subserviceToDelete, setSubserviceToDelete] = useState(null)
  const [editName, setEditName] = useState("")
  const [newSubserviceName, setNewSubserviceName] = useState("")
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

  // Fetch subservices when parent service changes
  useEffect(() => {
    if (parentService) {
      fetchSubservices()
    }
  }, [parentService])

  // Fetch subservices for the selected parent service
  const fetchSubservices = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/subservice?serviceId=${parentService._id}`)
      if (!response.ok) throw new Error("Failed to fetch subservices")

      let data = await response.json()

      // Ensure data is an array
      if (!Array.isArray(data)) {
        if (data && typeof data === "object" && data.data) {
          data = data.data
        } else {
          console.error("API response is not an array:", data)
          data = []
        }
      }

      // Sort subservices by isActive and order
      const sortedSubservices = sortSubservices(data)
      setSubservices(sortedSubservices)

      // Reset history when fetching new data
      setHistory([])
      setHistoryIndex(-1)
      setUnsavedChanges(false)
      setChangesMade(0)
    } catch (error) {
      console.error("Error fetching subservices:", error)
      setSubservices([])
      toast({
        title: "Error",
        description: "Failed to load subservices. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Sort subservices by isActive and order
  const sortSubservices = (subservices) => {
    return [...subservices].sort((a, b) => {
      // First sort by isActive (true comes first)
      if (a.isActive !== b.isActive) {
        return a.isActive ? -1 : 1
      }
      // Then sort by order for active subservices
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
          setSubservices((prevSubservices) => prevSubservices.filter((s) => s._id !== action.subservice._id))
          break
        case "EDIT":
        case "TOGGLE":
          if (action.prevState) {
            setSubservices((prevSubservices) =>
              prevSubservices.map((s) => (s._id === action.subservice._id ? action.prevState : s)),
            )
          }
          break
        case "DELETE":
          if (action.prevState) {
            setSubservices((prevSubservices) => [...prevSubservices, action.subservice])
          }
          break
        case "REORDER":
          if (action.prevState) {
            setSubservices(action.prevState)
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
          setSubservices((prevSubservices) => [...prevSubservices, action.subservice])
          break
        case "EDIT":
        case "TOGGLE":
          setSubservices((prevSubservices) =>
            prevSubservices.map((s) => (s._id === action.subservice._id ? action.subservice : s)),
          )
          break
        case "DELETE":
          setSubservices((prevSubservices) => prevSubservices.filter((s) => s._id !== action.subservice._id))
          break
        case "REORDER":
          setSubservices((prevSubservices) => {
            // Find the subservice being reordered
            const updatedSubservices = [...prevSubservices]
            const subserviceIndex = updatedSubservices.findIndex((s) => s._id === action.subservice._id)

            if (subserviceIndex !== -1) {
              // Update the order
              updatedSubservices[subserviceIndex] = action.subservice
            }

            return sortSubservices(updatedSubservices)
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
    fetchSubservices()

    toast({
      title: "Reset",
      description: "All changes have been discarded",
      variant: "default",
    })
  }

  // Toggle subservice active status
  const toggleSubserviceActive = (subservice) => {
    const updatedSubservice = { ...subservice, isActive: !subservice.isActive }

    // Add to history before updating
    addToHistory({
      type: "TOGGLE",
      subservice: updatedSubservice,
      prevState: subservice,
    })

    // Update subservices
    setSubservices((prevSubservices) => {
      const updated = prevSubservices.map((s) => (s._id === subservice._id ? updatedSubservice : s))
      return sortSubservices(updated)
    })

    toast({
      title: `Subservice ${updatedSubservice.isActive ? "Activated" : "Deactivated"}`,
      description: `"${subservice.name}" is now ${updatedSubservice.isActive ? "active" : "inactive"}`,
      variant: "default",
    })
  }

  // Open edit dialog
  const openEditDialog = (subservice) => {
    setEditingSubservice(subservice)
    setEditName(subservice.name)
    setEditDialogOpen(true)
  }

  // Save edited subservice name
  const saveEditedSubservice = () => {
    if (editingSubservice && editName.trim()) {
      const updatedSubservice = { ...editingSubservice, name: editName.trim() }

      // Add to history before updating
      addToHistory({
        type: "EDIT",
        subservice: updatedSubservice,
        prevState: editingSubservice,
      })

      // Update subservices
      setSubservices((prevSubservices) =>
        prevSubservices.map((s) => (s._id === editingSubservice._id ? updatedSubservice : s)),
      )

      setEditDialogOpen(false)
      setEditingSubservice(null)

      toast({
        title: "Subservice Updated",
        description: `Subservice name updated to "${updatedSubservice.name}"`,
        variant: "default",
      })
    }
  }

  // Open delete confirmation dialog
  const confirmDeleteSubservice = (subservice) => {
    setSubserviceToDelete(subservice)
    setDeleteDialogOpen(true)
  }

  // Delete subservice after confirmation
  const deleteSubservice = () => {
    if (subserviceToDelete) {
      // Add to history before deleting
      addToHistory({
        type: "DELETE",
        subservice: subserviceToDelete,
        prevState: subserviceToDelete,
      })

      // Update subservices - only filter out the specific subservice to delete
      setSubservices((prevSubservices) => prevSubservices.filter((s) => s._id !== subserviceToDelete._id))

      toast({
        title: "Subservice Deleted",
        description: `"${subserviceToDelete.name}" has been removed`,
        variant: "default",
      })

      setDeleteDialogOpen(false)
      setSubserviceToDelete(null)
    }
  }

  // Add new subservice
  const addNewSubservice = () => {
    if (newSubserviceName.trim()) {
      // Create a new subservice with a temporary ID
      const newSubservice = {
        _id: `temp-${Date.now()}`, // Temporary ID until saved to backend
        name: newSubserviceName.trim(),
        serviceId: parentService._id,
        order: activeSubservices.length + 1,
        isActive: true,
      }

      // Add to history
      addToHistory({
        type: "ADD",
        subservice: newSubservice,
      })

      // Update subservices
      setSubservices((prevSubservices) => sortSubservices([...prevSubservices, newSubservice]))

      // Reset and close dialog
      setNewSubserviceName("")
      setAddDialogOpen(false)

      toast({
        title: "Subservice Added",
        description: `"${newSubservice.name}" has been added`,
        variant: "default",
      })
    }
  }

  // Handle drag and drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index

    // Only allow reordering within active subservices
    const activeSubservices = subservices.filter((s) => s.isActive)

    if (
      sourceIndex === destinationIndex ||
      sourceIndex >= activeSubservices.length ||
      destinationIndex >= activeSubservices.length
    ) {
      return
    }

    // Create a copy of subservices
    const updatedSubservices = [...subservices]
    const activeSubservicesCopy = [...activeSubservices]

    // Reorder active subservices
    const [movedSubservice] = activeSubservicesCopy.splice(sourceIndex, 1)
    activeSubservicesCopy.splice(destinationIndex, 0, movedSubservice)

    // Update order numbers
    const reorderedActiveSubservices = activeSubservicesCopy.map((subservice, index) => ({
      ...subservice,
      order: index + 1,
    }))

    // Replace active subservices in the original array
    const inactiveSubservices = subservices.filter((s) => !s.isActive)
    const newSubservices = [...reorderedActiveSubservices, ...inactiveSubservices]

    // Save previous state for undo
    addToHistory({
      type: "REORDER",
      subservice: movedSubservice,
      prevState: updatedSubservices,
    })

    // Update subservices
    setSubservices(newSubservices)

    toast({
      title: "Order Updated",
      description: "Subservice order has been updated",
      variant: "default",
    })
  }

  // Save all changes to API
  const saveChanges = async () => {
    setSaving(true)

    try {
      // Track which subservices need to be created, updated, or deleted
      const response = await fetch(`/api/subservice?serviceId=${parentService._id}`)
      if (!response.ok) throw new Error("Failed to fetch original subservices")

      const originalSubservices = await response.json()

      // Ensure we're working with the data array
      const originalData = originalSubservices.data || []

      // Find subservices to create (not in original list)
      const subservicesToCreate = subservices.filter(
        (subservice) => !originalData.some((original) => original._id === subservice._id),
      )

      // Find subservices to update (in both lists but with changes)
      const subservicesToUpdate = subservices.filter((subservice) => {
        const original = originalData.find((o) => o._id === subservice._id)
        if (!original) return false

        return (
          original.name !== subservice.name ||
          original.order !== subservice.order ||
          original.isActive !== subservice.isActive
        )
      })

      // Find subservices to delete (in original but not in current)
      const subservicesToDelete = originalData.filter(
        (original) => !subservices.some((subservice) => subservice._id === original._id),
      )

      // Create new subservices
      const createPromises = subservicesToCreate.map((subservice) =>
        fetch("/api/subservice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...subservice,
            serviceId: parentService._id,
          }),
        }),
      )

      // Update existing subservices
      const updatePromises = subservicesToUpdate.map((subservice) =>
        fetch(`/api/subservice/${subservice._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(subservice),
        }),
      )

      // Delete subservices - use the correct ID field (_id) for the API
      const deletePromises = subservicesToDelete.map((subservice) =>
        fetch(`/api/subservice/${subservice._id || subservice._id}`, {
          method: "DELETE",
        }),
      )

      // Wait for all operations to complete
      await Promise.all([...createPromises, ...updatePromises, ...deletePromises])

      toast({
        title: "Changes Saved",
        description: `Successfully saved ${subservicesToCreate.length + subservicesToUpdate.length + subservicesToDelete.length} changes`,
        variant: "success",
      })

      // Refresh subservices
      fetchSubservices()
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

  // Render active and inactive subservices separately
  const activeSubservices = subservices.filter((subservice) => subservice.isActive)
  const inactiveSubservices = subservices.filter((subservice) => !subservice.isActive)

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Subservices for {parentService.name}</h1>
            <p className="text-muted-foreground mt-1">Manage, organize, and prioritize subservices</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="default"
              onClick={() => setAddDialogOpen(true)}
              className="animate-in fade-in-50 duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Subservice
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
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="overflow-hidden border shadow-sm">
              <CardHeader className="bg-background pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    Active Subservices
                    <Badge variant="default" className="ml-2">
                      {activeSubservices.length}
                    </Badge>
                  </div>
                </CardTitle>
                <CardDescription>Drag to reorder. Active subservices are displayed to users.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="active-subservices">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {activeSubservices.length > 0 ? (
                          activeSubservices.map((subservice, index) => (
                            <Draggable key={subservice._d} draggableId={subservice._id} index={index}>
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
                                    <span className="font-medium">{subservice.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-muted-foreground hover:text-foreground transition-colors"
                                      onClick={() => openEditDialog(subservice)}
                                    >
                                      <Edit className="h-4 w-4" />
                                      <span className="sr-only">Edit</span>
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-muted-foreground hover:text-destructive transition-colors"
                                      onClick={() => confirmDeleteSubservice(subservice)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                      <span className="sr-only">Delete</span>
                                    </Button>
                                    <div className="flex items-center gap-2 pl-2">
                                      <Switch
                                        checked={subservice.isActive}
                                        onCheckedChange={() => toggleSubserviceActive(subservice)}
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
                            <p>No active subservices</p>
                            <Button variant="link" size="sm" onClick={() => setAddDialogOpen(true)} className="mt-2">
                              Add your first subservice
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
                    Inactive Subservices
                    <Badge variant="secondary" className="ml-2">
                      {inactiveSubservices.length}
                    </Badge>
                  </div>
                </CardTitle>
                <CardDescription>Inactive subservices are hidden from users.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {inactiveSubservices.length > 0 ? (
                    inactiveSubservices.map((subservice, index) => (
                      <div
                        key={subservice._id}
                        className="flex items-center justify-between p-3 border rounded-md 
                                  bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted/30 text-muted-foreground font-medium">
                            {index + 1}
                          </div>
                          <span className="font-medium text-muted-foreground">{subservice.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => openEditDialog(subservice)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            onClick={() => confirmDeleteSubservice(subservice)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                          <div className="flex items-center gap-2 pl-2">
                            <Switch
                              checked={subservice.isActive}
                              onCheckedChange={() => toggleSubserviceActive(subservice)}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-md border border-dashed">
                      <p>No inactive subservices</p>
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
              <DialogTitle>Edit Subservice</DialogTitle>
              <DialogDescription>Update the subservice details below.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="subservice-name" className="text-muted-foreground">
                Subservice Name
              </Label>
              <Input
                id="subservice-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="mt-2"
                placeholder="Enter subservice name"
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveEditedSubservice} disabled={!editName.trim()}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Subservice Dialog */}
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Subservice</DialogTitle>
              <DialogDescription>Enter the details for the new subservice.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="new-subservice-name" className="text-muted-foreground">
                Subservice Name
              </Label>
              <Input
                id="new-subservice-name"
                value={newSubserviceName}
                onChange={(e) => setNewSubserviceName(e.target.value)}
                className="mt-2"
                placeholder="Enter subservice name"
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addNewSubservice} disabled={!newSubserviceName.trim()}>
                Add Subservice
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
                This will remove "{subserviceToDelete?.name}" from your subservices list. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={deleteSubservice}
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

