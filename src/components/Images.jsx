"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Upload,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  MoreVertical,
  Trash,
  Home,
  Undo,
  Redo,
  Save,
  Edit,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function ImageManagement() {
  const [activeTab, setActiveTab] = useState("upload");
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [selectedSubServices, setSelectedSubServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSubServices, setLoadingSubServices] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [manageService, setManageService] = useState("");
  const [manageSubService, setManageSubService] = useState("");
  const [manageSubTab, setManageSubTab] = useState("tab1");
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);

  // Image management state
  const [homeImages, setHomeImages] = useState([]);
  const [serviceImages, setServiceImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [slideshow, setSlideshow] = useState({
    open: false,
    index: 0,
    images: [],
  });

  // Edit image dialog
  const [editImageDialog, setEditImageDialog] = useState({
    open: false,
    image: null,
    selectedSubServices: [],
  });

  // Change tracking
  const [changes, setChanges] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    category: "",
    subServices: [],
    atHome: false,
  });

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/service");
        if (!response.ok) throw new Error("Failed to fetch services");
        const data1 = await response.json();
        const data = data1.data;
        setServices(data);
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, category: data[0].name }));
          setManageService(data[0].name);
          // Fetch subservices for the first service
          fetchSubServices(data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        toast({
          title: "Error",
          description: "Failed to load services. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [toast]);

  const fetchSubServices = async (serviceId) => {
    setLoadingSubServices(true);
    try {
      const response = await fetch(`/api/subservice?serviceId=${serviceId}`);
      if (!response.ok) throw new Error("Failed to fetch subservices");
      const data = await response.json();
      setSubServices(data.data || []);
      // Reset selected subservices
      setSelectedSubServices([]);
      setFormData((prev) => ({ ...prev, subServices: [] }));
      setManageSubService("");
    } catch (error) {
      console.error("Error fetching subservices:", error);
      toast({
        title: "Error",
        description: "Failed to load subservices. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingSubServices(false);
    }
  };

  useEffect(() => {
    if (manageService) {
      // Find the service object by name
      const serviceObj = services.find((s) => s.name === manageService);
      if (serviceObj) {
        fetchSubServices(serviceObj._id);
        fetchImages(serviceObj._id);
      }
    }
  }, [manageService]);

  useEffect(() => {
    if (formData.category) {
      // Find the service object by name
      const serviceObj = services.find((s) => s.name === formData.category);
      if (serviceObj) {
        fetchSubServices(serviceObj._id);
      }
    }
  }, [formData.category, services]);

  useEffect(() => {
    const handlePaste = (e) => {
      if (activeTab !== "upload") return;

      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
            break;
          }
        }
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && slideshow.open) {
        setSlideshow((prev) => ({ ...prev, open: false }));
      }
    };

    document.addEventListener("paste", handlePaste);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeTab, slideshow.open]);

  // Setup drag and drop for file upload
  useEffect(() => {
    const dropArea = dropAreaRef.current;
    if (!dropArea) return;

    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropArea.classList.add("border-primary");
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropArea.classList.remove("border-primary");
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropArea.classList.remove("border-primary");

      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith("image/")) {
          setSelectedFile(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewUrl(reader.result);
          };
          reader.readAsDataURL(file);
        }
      }
    };

    dropArea.addEventListener("dragover", handleDragOver);
    dropArea.addEventListener("dragleave", handleDragLeave);
    dropArea.addEventListener("drop", handleDrop);

    return () => {
      dropArea.removeEventListener("dragover", handleDragOver);
      dropArea.removeEventListener("dragleave", handleDragLeave);
      dropArea.removeEventListener("drop", handleDrop);
    };
  }, []);

  const fetchImages = async (serviceId, subServiceId = null) => {
    setLoadingImages(true);
    try {
      let url = `/api/images?serviceId=${serviceId}`;
      let url1 = url;
      if (subServiceId) {
        url1 += `&subServiceId=${subServiceId}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      const homeImgs = data
        .filter((img) => img.atHome)
        .sort((a, b) => a.orderAtHome - b.orderAtHome);
      const response1 = await fetch(url1);

      if (!response1.ok) {
        throw new Error(`Error: ${response1.statusText}`);
      }

      const data1 = await response1.json();
      const serviceImgs = data1.sort((a, b) => a.orderAtPage - b.orderAtPage);

      setHomeImages(homeImgs);
      setServiceImages(serviceImgs);

      // Reset change tracking
      setChanges([]);
      setHistory([]);
      setHistoryIndex(-1);
    } catch (error) {
      console.error("Error fetching images:", error);
      toast({
        title: "Error",
        description: "Failed to load images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingImages(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubServiceChange = (subServiceId, checked) => {
    setFormData((prev) => {
      const updatedSubServices = checked
        ? [...prev.subServices, subServiceId]
        : prev.subServices.filter((id) => id !== subServiceId);

      return {
        ...prev,
        subServices: updatedSubServices,
      };
    });
  };

  const handleEditSubServiceChange = (subServiceId, checked) => {
    setEditImageDialog((prev) => {
      const updatedSubServices = checked
        ? [...prev.selectedSubServices, subServiceId]
        : prev.selectedSubServices.filter((id) => id !== subServiceId);

      return {
        ...prev,
        selectedSubServices: updatedSubServices,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select an image to upload",
        variant: "destructive",
      });
      return;
    }

    if (formData.subServices.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one subservice",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    const formPayload = new FormData();
    formPayload.append("image", selectedFile);

    // Find the service ID from the name
    const serviceObj = services.find((s) => s.name === formData.category);
    if (!serviceObj) {
      toast({
        title: "Error",
        description: "Invalid service selected",
        variant: "destructive",
      });
      setUploading(false);
      return;
    }

    formPayload.append("serviceId", serviceObj._id);

    // Add all selected subservices
    formData.subServices.forEach((subServiceId) => {
      formPayload.append("subServiceId", subServiceId);
    });

    formPayload.append("atHome", formData.atHome.toString());

    try {
      const response = await fetch("/api/images", {
        method: "POST",
        body: formPayload,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload image");
      }

      const result = await response.json();
      toast({
        title: "Success",
        description: result.message || "Image uploaded successfully!",
      });

      // Reset form
      setSelectedFile(null);
      setPreviewUrl(null);
      setFormData({
        category: services.length > 0 ? services[0].name : "",
        subServices: [],
        atHome: false,
      });

      // Refresh images if we're on the same service
      if (formData.category === manageService) {
        const serviceObj = services.find((s) => s.name === manageService);
        if (serviceObj) {
          fetchImages(serviceObj._id, manageSubService || null);
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const openSlideshow = (images, startIndex) => {
    setSlideshow({
      open: true,
      index: startIndex,
      images: images,
    });
  };

  const nextSlide = () => {
    setSlideshow((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length,
    }));
  };

  const prevSlide = () => {
    setSlideshow((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.images.length) % prev.images.length,
    }));
  };

  const startAutoSlideshow = () => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  };

  const addChange = (change) => {
    // Add to changes and create a new history point
    setChanges((prev) => [...prev, change]);

    // If we're in the middle of history, truncate forward history
    if (historyIndex >= 0 && historyIndex < history.length - 1) {
      setHistory((prev) => prev.slice(0, historyIndex + 1));
    }

    // Add current changes to history
    setHistory((prev) => [...prev, [...changes, change]]);
    setHistoryIndex((prev) => prev + 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setChanges(history[historyIndex - 1]);

      // Apply the changes to the UI
      applyChangesToUI(history[historyIndex - 1]);
    } else if (historyIndex === 0) {
      // Go back to initial state
      setHistoryIndex(-1);
      setChanges([]);

      // Find the service ID from the name
      const serviceObj = services.find((s) => s.name === manageService);
      if (serviceObj) {
        fetchImages(serviceObj._id, manageSubService || null);
      }
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setChanges(history[historyIndex + 1]);

      // Apply the changes to the UI
      applyChangesToUI(history[historyIndex + 1]);
    }
  };

  const applyChangesToUI = (changesArray) => {
    // Reset to original state first
    const serviceObj = services.find((s) => s.name === manageService);
    if (serviceObj) {
      fetchImages(serviceObj._id, manageSubService || null);
    }

    // Then apply all changes in sequence
    // This is a simplified version - in a real app you'd need more sophisticated logic
    changesArray.forEach((change) => {
      if (change.type === "toggleHome") {
        const { imageId, data } = change;

        setHomeImages((prev) => {
          if (data.newValue) {
            // Add to home if not already there
            const image = serviceImages.find((img) => img._id === imageId);
            if (image && !prev.some((img) => img._id === imageId)) {
              return [
                ...prev,
                { ...image, atHome: true, orderAtHome: prev.length },
              ];
            }
          } else {
            // Remove from home
            return prev.filter((img) => img._id !== imageId);
          }
          return prev;
        });

        setServiceImages((prev) =>
          prev.map((img) =>
            img._id === imageId ? { ...img, atHome: data.newValue } : img
          )
        );
      } else if (change.type === "delete") {
        setHomeImages((prev) =>
          prev.filter((img) => img._id !== change.imageId)
        );
        setServiceImages((prev) =>
          prev.filter((img) => img._id !== change.imageId)
        );
      } else if (change.type === "move") {
        // Handle reordering logic
        const { source, destination } = change.data;

        if (source.droppableId === "home-images") {
          const reordered = Array.from(homeImages);
          const [removed] = reordered.splice(source.index, 1);
          reordered.splice(destination.index, 0, removed);

          // Update order
          const updatedImages = reordered.map((img, index) => ({
            ...img,
            orderAtHome: index,
          }));

          setHomeImages(updatedImages);
        } else if (source.droppableId === "service-images") {
          const reordered = Array.from(serviceImages);
          const [removed] = reordered.splice(source.index, 1);
          reordered.splice(destination.index, 0, removed);

          // Update order
          const updatedImages = reordered.map((img, index) => ({
            ...img,
            orderAtPage: index,
          }));

          setServiceImages(updatedImages);
        }
      } else if (change.type === "updateSubServices") {
        // Update subservices for an image
        const { imageId, data } = change;
        setServiceImages((prev) =>
          prev.map((img) =>
            img._id === imageId
              ? { ...img, subServiceId: data.newSubServices }
              : img
          )
        );

        setHomeImages((prev) =>
          prev.map((img) =>
            img._id === imageId
              ? { ...img, subServiceId: data.newSubServices }
              : img
          )
        );
      }
    });
  };

  const handleToggleHome = (imageId, currentValue) => {
    addChange({
      type: "toggleHome",
      imageId,
      data: { newValue: !currentValue, oldValue: currentValue },
    });

    if (!currentValue) {
      // Add to home
      const image = serviceImages.find((img) => img._id === imageId);
      if (image) {
        setHomeImages((prev) => [
          ...prev,
          { ...image, atHome: true, orderAtHome: prev.length },
        ]);
      }
    } else {
      // Remove from home
      setHomeImages((prev) => prev.filter((img) => img._id !== imageId));
    }

    // Update in service images
    setServiceImages((prev) =>
      prev.map((img) =>
        img._id === imageId ? { ...img, atHome: !currentValue } : img
      )
    );
  };

  const handleDeleteImage = (imageId) => {
    addChange({
      type: "delete",
      imageId,
      data: {
        homeImage: homeImages.find((img) => img._id === imageId),
        serviceImage: serviceImages.find((img) => img._id === imageId),
      },
    });

    setHomeImages((prev) => prev.filter((img) => img._id !== imageId));
    setServiceImages((prev) => prev.filter((img) => img._id !== imageId));
  };

  const handleEditImage = (imageId) => {
    const image = serviceImages.find((img) => img._id === imageId);
    if (image) {
      setEditImageDialog({
        open: true,
        image,
        selectedSubServices: image.subServiceId || [],
      });
    }
  };

  const handleSaveEditImage = () => {
    const { image, selectedSubServices } = editImageDialog;

    if (selectedSubServices.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one subservice",
        variant: "destructive",
      });
      return;
    }

    // Add change to history
    addChange({
      type: "updateSubServices",
      imageId: image._id,
      data: {
        oldSubServices: image.subServiceId,
        newSubServices: selectedSubServices,
      },
    });

    // Update images in state
    setServiceImages((prev) =>
      prev.map((img) =>
        img._id === image._id
          ? { ...img, subServiceId: selectedSubServices }
          : img
      )
    );

    setHomeImages((prev) =>
      prev.map((img) =>
        img._id === image._id
          ? { ...img, subServiceId: selectedSubServices }
          : img
      )
    );

    // Close dialog
    setEditImageDialog({
      open: false,
      image: null,
      selectedSubServices: [],
    });

    toast({
      title: "Success",
      description: "Image updated successfully!",
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // If dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    addChange({
      type: "move",
      imageId: result.draggableId,
      data: { source, destination },
    });

    if (source.droppableId === "home-images") {
      const reordered = Array.from(homeImages);
      const [removed] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, removed);

      // Update order
      const updatedImages = reordered.map((img, index) => ({
        ...img,
        orderAtHome: index,
      }));

      setHomeImages(updatedImages);
    } else if (source.droppableId === "service-images") {
      const reordered = Array.from(serviceImages);
      const [removed] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, removed);

      // Update order
      const updatedImages = reordered.map((img, index) => ({
        ...img,
        orderAtPage: index,
      }));

      setServiceImages(updatedImages);
    }
  };

  const saveChanges = async () => {
    setSaving(true);

    try {
      // Group changes by image ID for efficiency
      const changesByImage = {};

      changes.forEach((change) => {
        if (!changesByImage[change.imageId]) {
          changesByImage[change.imageId] = [];
        }
        changesByImage[change.imageId].push(change);
      });

      // Process each image's changes
      const promises = Object.entries(changesByImage).map(
        async ([imageId, imageChanges]) => {
          // Check if image was deleted
          if (imageChanges.some((c) => c.type === "delete")) {
            // Send delete request
            return fetch(`/api/images/${imageId}`, { method: "DELETE" });
          } else {
            // Determine final state after all changes
            const toggleChanges = imageChanges.filter(
              (c) => c.type === "toggleHome"
            );
            const subServiceChanges = imageChanges.filter(
              (c) => c.type === "updateSubServices"
            );

            let finalAtHome =
              serviceImages.find((img) => img._id === imageId)?.atHome || false;
            let finalSubServices =
              serviceImages.find((img) => img._id === imageId)?.subServiceId ||
              [];

            if (toggleChanges.length > 0) {
              // Use the latest toggle change
              finalAtHome =
                toggleChanges[toggleChanges.length - 1].data.newValue;
            }

            if (subServiceChanges.length > 0) {
              // Use the latest subservice change
              finalSubServices =
                subServiceChanges[subServiceChanges.length - 1].data
                  .newSubServices;
            }

            // Get final order
            const homeImage = homeImages.find((img) => img._id === imageId);
            const serviceImage = serviceImages.find(
              (img) => img._id === imageId
            );

            // Send update request with the current order values
            return fetch(`/api/images/${imageId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                atHome: finalAtHome,
                subServiceId: finalSubServices,
                orderAtHome: homeImage?.orderAtHome ?? -1,
                orderAtPage: serviceImage?.orderAtPage ?? 0,
              }),
            });
          }
        }
      );

      // If there are any reordering changes, we need to update all images in the affected list
      // to ensure consistent ordering
      if (changes.some((change) => change.type === "move")) {
        // Update all home images order
        const homeImagesPromises = homeImages.map((img, index) => {
          return fetch(`/api/images/${img._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderAtHome: index,
              // Preserve other properties
              atHome: img.atHome,
              subServiceId: img.subServiceId,
              orderAtPage: img.orderAtPage,
            }),
          });
        });

        // Update all service images order
        const serviceImagesPromises = serviceImages.map((img, index) => {
          return fetch(`/api/images/${img._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderAtPage: index,
              // Preserve other properties
              atHome: img.atHome,
              subServiceId: img.subServiceId,
              orderAtHome: img.orderAtHome,
            }),
          });
        });

        // Add these promises to the main promises array
        promises.push(...homeImagesPromises, ...serviceImagesPromises);
      }

      await Promise.all(promises);

      toast({
        title: "Success",
        description: "All changes saved successfully!",
      });

      // Reset change tracking
      setChanges([]);
      setHistory([]);
      setHistoryIndex(-1);

      // Refresh images
      const serviceObj = services.find((s) => s.name === manageService);
      if (serviceObj) {
        fetchImages(serviceObj._id, manageSubService || null);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const discardChanges = () => {
    // Reset to original state
    const serviceObj = services.find((s) => s.name === manageService);
    if (serviceObj) {
      fetchImages(serviceObj._id, manageSubService || null);
    }

    // Reset change tracking
    setChanges([]);
    setHistory([]);
    setHistoryIndex(-1);

    toast({
      title: "Changes Discarded",
      description: "All changes have been discarded.",
    });
  };

  const handleManageSubServiceChange = (value) => {
    setManageSubService(value);

    // Fetch images filtered by subservice
    const serviceObj = services.find((s) => s.name === manageService);
    if (serviceObj) {
      fetchImages(serviceObj._id, value || null);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Image Management</CardTitle>
        <CardDescription>
          Upload and manage images for your services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="upload"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="manage">Manage</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="service">Service</Label>
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-muted-foreground">
                          Loading services...
                        </span>
                      </div>
                    ) : (
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleInputChange("category", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service._id} value={service.name}>
                              {service.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Subservices (select at least one)</Label>
                    {loadingSubServices ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-muted-foreground">
                          Loading subservices...
                        </span>
                      </div>
                    ) : subServices.length === 0 ? (
                      <div className="text-sm text-muted-foreground">
                        No subservices available for this service
                      </div>
                    ) : (
                      <div className="space-y-2 border rounded-md p-3">
                        {subServices.map((subService) => (
                          <div
                            key={subService._id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`subservice-${subService._id}`}
                              checked={formData.subServices.includes(
                                subService._id
                              )}
                              onCheckedChange={(checked) =>
                                handleSubServiceChange(subService._id, checked)
                              }
                            />
                            <Label
                              htmlFor={`subservice-${subService._id}`}
                              className="font-normal"
                            >
                              {subService.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="atHome"
                      checked={formData.atHome}
                      onCheckedChange={(checked) =>
                        handleInputChange("atHome", checked)
                      }
                    />
                    <Label htmlFor="atHome">Show on home page</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div
                    ref={dropAreaRef}
                    className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] bg-muted/50 relative transition-colors"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="image"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={handleFileChange}
                    />

                    {previewUrl ? (
                      <div className="relative w-full h-full min-h-[200px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl(null);
                          }}
                        >
                          Change
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">
                          Drag and drop an image, paste, or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          JPG, PNG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      uploading ||
                      !selectedFile ||
                      formData.subServices.length === 0
                    }
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="manage">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manageService">Select Service</Label>
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">
                        Loading services...
                      </span>
                    </div>
                  ) : (
                    <Select
                      value={manageService}
                      onValueChange={setManageService}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service._id} value={service.name}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
{manageSubTab === 'tab2' && (<div  className="space-y-2">
                  <Label htmlFor="manageSubService">Filter by Subservice</Label>
                  {loadingSubServices ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">
                        Loading subservices...
                      </span>
                    </div>
                  ) : (
                    <Select
                      value={manageSubService}
                      onValueChange={handleManageSubServiceChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Subservices" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subservices</SelectItem>
                        {subServices.map((subService) => (
                          <SelectItem
                            key={subService._id}
                            value={subService._id}
                          >
                            {subService.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>) }
                
              </div>

              {changes.length > 0 && (
                <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUndo}
                      disabled={historyIndex < 0}
                    >
                      <Undo className="h-4 w-4 mr-1" />
                      Undo
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRedo}
                      disabled={historyIndex >= history.length - 1}
                    >
                      <Redo className="h-4 w-4 mr-1" />
                      Redo
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {changes.length}{" "}
                    {changes.length === 1 ? "change" : "changes"} pending
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={discardChanges}
                    >
                      Discard Changes
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={saveChanges}
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-1" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              <Tabs
                defaultValue="tab1"
                value={manageSubTab}
                onValueChange={setManageSubTab}
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="tab1">Home Images</TabsTrigger>
                  <TabsTrigger value="tab2">Service Images</TabsTrigger>
                </TabsList>

                <TabsContent value="tab1">
                  {loadingImages ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : homeImages.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      No images are set to display on the home page.
                    </div>
                  ) : (
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable
                        droppableId="home-images"
                        direction="horizontal"
                      >
                        {(provided) => (
                          <div
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {homeImages.map((image, index) => (
                              <Draggable
                                key={image._id}
                                draggableId={image._id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="relative group cursor-move"
                                    onClick={() =>
                                      openSlideshow(homeImages, index)
                                    }
                                  >
                                    <div className="aspect-square overflow-hidden border-r border-b border-border">
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        src={
                                          `/api/images/getImage?filename=${image.filename}` ||
                                          "/placeholder.svg"
                                        }
                                        alt={image.filename}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                      />
                                    </div>
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button
                                            variant="secondary"
                                            size="icon"
                                            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                                          >
                                            <MoreVertical className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleEditImage(image._id);
                                            }}
                                          >
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit Subservices
                                          </DropdownMenuItem>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleToggleHome(image._id, true);
                                            }}
                                          >
                                            <Home className="h-4 w-4 mr-2" />
                                            Remove from Home
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleDeleteImage(image._id);
                                            }}
                                          >
                                            <Trash className="h-4 w-4 mr-2" />
                                            Delete Image
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  )}
                </TabsContent>

                <TabsContent value="tab2">
                  {loadingImages ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : serviceImages.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      No images found for this service.
                    </div>
                  ) : (
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable
                        droppableId="service-images"
                        direction="horizontal"
                      >
                        {(provided) => (
                          <div
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {serviceImages.map((image, index) => (
                              <Draggable
                                key={image._id}
                                draggableId={image._id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="relative group cursor-move"
                                    onClick={() =>
                                      openSlideshow(serviceImages, index)
                                    }
                                  >
                                    <div className="aspect-square overflow-hidden border-r border-b border-border">
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        src={
                                          `/api/images/getImage?filename=${image.filename}` ||
                                          "/placeholder.svg"
                                        }
                                        alt={image.filename}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                      />
                                    </div>
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button
                                            variant="secondary"
                                            size="icon"
                                            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                                          >
                                            <MoreVertical className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleEditImage(image._id);
                                            }}
                                          >
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit Subservices
                                          </DropdownMenuItem>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleToggleHome(
                                                image._id,
                                                image.atHome
                                              );
                                            }}
                                          >
                                            <Home className="h-4 w-4 mr-2" />
                                            {image.atHome
                                              ? "Remove from Home"
                                              : "Add to Home"}
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleDeleteImage(image._id);
                                            }}
                                          >
                                            <Trash className="h-4 w-4 mr-2" />
                                            Delete Image
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Slideshow Modal */}
      <Dialog
        open={slideshow.open}
        onOpenChange={(open) => setSlideshow((prev) => ({ ...prev, open }))}
      >
        <DialogContent className="max-w-4xl p-0 bg-background/95 backdrop-blur-sm">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={() => setSlideshow((prev) => ({ ...prev, open: false }))}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="flex items-center justify-center p-4 h-[80vh]">
              {slideshow.images.length > 0 && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={
                    `/api/images/getImage?filename=${
                      slideshow.images[slideshow.index].filename
                    }` || "/placeholder.svg"
                  }
                  alt={slideshow.images[slideshow.index].filename}
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>

            <div className="absolute inset-y-0 left-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm ml-2"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm mr-2"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full bg-background/80 backdrop-blur-sm"
                onClick={startAutoSlideshow}
              >
                <Play className="h-4 w-4 mr-1" />
                Slideshow
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Image Dialog */}
      <Dialog
        open={editImageDialog.open}
        onOpenChange={(open) =>
          !open && setEditImageDialog((prev) => ({ ...prev, open }))
        }
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Image Subservices</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select at least one subservice</Label>
              {loadingSubServices ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">
                    Loading subservices...
                  </span>
                </div>
              ) : subServices.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No subservices available for this service
                </div>
              ) : (
                <div className="space-y-2 border rounded-md p-3 max-h-[300px] overflow-y-auto">
                  {subServices.map((subService) => (
                    <div
                      key={subService._id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`edit-subservice-${subService._id}`}
                        checked={editImageDialog.selectedSubServices.includes(
                          subService._id
                        )}
                        onCheckedChange={(checked) =>
                          handleEditSubServiceChange(subService._id, checked)
                        }
                      />
                      <Label
                        htmlFor={`edit-subservice-${subService._id}`}
                        className="font-normal"
                      >
                        {subService.name}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setEditImageDialog((prev) => ({ ...prev, open: false }))
              }
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveEditImage}
              disabled={editImageDialog.selectedSubServices.length === 0}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
