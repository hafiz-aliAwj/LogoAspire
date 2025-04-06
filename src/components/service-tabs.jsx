"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import ServiceManager from "./service-manager"
import SubserviceManager from "./subservice-manager"

export default function ServiceTabs() {
  const { toast } = useToast()
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch services for the dropdown
  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/service")
      if (!response.ok) throw new Error("Failed to fetch services")

      const data = await response.json()
      const activeServices = data.data.filter((service) => service.isActive)

      setServices(activeServices)

      // Set the first service as selected by default if available
      if (activeServices.length > 0 && !selectedService) {
        setSelectedService(activeServices[0])
      }
    } catch (error) {
      console.error("Error fetching services:", error)
      toast({
        title: "Error",
        description: "Failed to load services. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleServiceChange = (serviceId) => {
    const service = services.find((s) => s._id === serviceId)
    setSelectedService(service)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Tabs defaultValue="services" className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Service Management</h1>
            <p className="text-muted-foreground mt-1">Manage your services and subservices</p>
          </div>
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="subservices">Subservices</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="services" className="mt-0">
          <ServiceManager />
        </TabsContent>

        <TabsContent value="subservices" className="mt-0">
          {loading ? (
            <Card>
              <CardHeader>
                <CardTitle>Loading services...</CardTitle>
                <CardDescription>Please wait while we load available services.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-12 w-full bg-muted animate-pulse rounded-md"></div>
              </CardContent>
            </Card>
          ) : services.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No services available</CardTitle>
                <CardDescription>
                  You need to create and activate services before you can manage subservices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Go to the Services tab to create services first.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Select a Service</CardTitle>
                  <CardDescription>Choose a service to manage its subservices</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedService?._id} onValueChange={handleServiceChange}>
                    <SelectTrigger className="w-full md:w-[300px]">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service._id} value={service._id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {selectedService ? (
                <SubserviceManager parentService={selectedService} />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No Service Selected</CardTitle>
                    <CardDescription>Please select a service from the dropdown above.</CardDescription>
                  </CardHeader>
                </Card>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

