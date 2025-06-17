import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AppLayout from '@/components/Layout/AppLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { displayApi } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import { Monitor, Plus, Settings, Eye, Trash2, Wifi } from 'lucide-react'

export default function Displays() {
  const [displays, setDisplays] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadDisplays()
  }, [])

  const loadDisplays = async () => {
    try {
      const response = await displayApi.getAll()
      setDisplays(response.data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load displays",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createDisplay = async () => {
    try {
      const response = await displayApi.create({
        name: `Display ${displays.length + 1}`,
        description: 'New display'
      })
      setDisplays(prev => [...prev, response.data])
      toast({
        title: "Success",
        description: "Display created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create display",
        variant: "destructive",
      })
    }
  }

  const deleteDisplay = async (id) => {
    try {
      await displayApi.delete(id)
      setDisplays(prev => prev.filter(d => d.id !== id))
      toast({
        title: "Success",
        description: "Display deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete display",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Displays</h1>
            <p className="text-muted-foreground">
              Manage your digital signage displays
            </p>
          </div>
          <Button onClick={createDisplay}>
            <Plus className="mr-2 h-4 w-4" />
            Create Display
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displays.map((display, index) => (
            <motion.div
              key={display.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Monitor className="h-8 w-8 text-primary" />
                    <div className="flex items-center space-x-1 text-green-500">
                      <Wifi className="h-4 w-4" />
                      <span className="text-xs">Online</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{display.name}</CardTitle>
                  <CardDescription>
                    {display.description || 'No description'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Link to={`/layout/${display.id}`}>
                      <Button size="sm" variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        Layout
                      </Button>
                    </Link>
                    <Link to={`/preview/${display.id}`}>
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                    </Link>
                    <Link to={`/display/${display.id}`}>
                      <Button size="sm" variant="outline">
                        <Monitor className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => deleteDisplay(display.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {displays.length === 0 && (
          <div className="text-center py-12">
            <Monitor className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold">No displays</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get started by creating a new display.
            </p>
            <div className="mt-6">
              <Button onClick={createDisplay}>
                <Plus className="mr-2 h-4 w-4" />
                Create Display
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}