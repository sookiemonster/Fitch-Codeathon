"use client"
import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { Poppins } from 'next/font/google'
import { useRouter } from 'next/navigation'

const poppins = Poppins({ subsets: ['latin'], weight: ["400"] })
const poppinsBold = Poppins({ subsets: ['latin'], weight: ["800"] })


interface InventoryItem {
  id: number
  name: string
  type: string | null
  status: string
  owner: number
  size: number
}

interface SummaryData {
  cups: number,
  plates: number,
  halal: number,
  veg: number,
  reg: number,
  cleanPlates: number,
  dirtyPlates: number,
  cleanCups: number,
  dirtyCups: number,
  halalDirty: number,
  halalClean: number,
  vegDirty: number,
  vegClean: number,
  regDirty: number,
  regClean: number
}

interface VendorData {
  id: number
  name: string | null
  x: number
  y: number
  inventory: {
    items: InventoryItem[]
  }
}

interface Notification {
  title: string
  message: string
  read : boolean
}

function handleLogout() {
  localStorage.removeItem('token')
  window.location.reload()
}

export default function RealTimeVendorDashboard({ params }: { params: { vendorId: string } }) {
  const router = useRouter()
  const [vendorData, setVendorData] = useState<VendorData | null>(null)
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([{ title: 'yo', message: 'Welcome to your dashboard!', read: false }])

  useEffect(() => {

    const token = localStorage.getItem('token');

    if (!token) {
      // Redirect to the login page if no token is found
      router.push('/');
    }

    const fetchData = async () => {
      try {
        
        const response = await fetch(`http://localhost:5000/api/v1/vendors/${params.vendorId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        setVendorData(data)
        setError(null)
      } catch (err) {
        setError('Error fetching data. Please try again later.')
        console.error('Fetch error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    const fetchSummaryData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/vendors/${params.vendorId}/inventory/detailed`)
        if (!response.ok) {
          throw new Error('Failed to fetch summary data')
        }
        const data = await response.json()
        setSummaryData(data)
        setError(null)
      } catch (err) {
        setError('Error fetching summary data. Please try again later.')
        console.error('Fetch error:', err)
      } finally {
        handleNotifications();
        setIsLoading(false)
      }
    }

    const handleNotifications = async () => {

      if (!summaryData) {
        return;
      }

      if (summaryData!.plates < 100) {
        setNotifications([
          ...notifications,
          { title: 'Plates Alert', message: 'There are less than 100 plates in stock', read: false },
        ])
      }

      

      if (summaryData!.cups < 100) {
        setNotifications([
          ...notifications,
          { title: 'Cups Alert', message: 'There are less than 100 cups in stock', read: false },
        ])
      }

      if (summaryData!.halal < 100) {
        setNotifications([
          ...notifications,
          { title: 'Halal Alert', message: 'There are less than 50 halal items in stock', read: false },
        ])
      }

      if (summaryData!.veg < 100) {
        setNotifications([
          ...notifications,
          { title: 'Vegan Alert', message: 'There are less than 50 vegan items in stock', read: false },
        ])
      }

      if (summaryData!.reg < 100) {
        setNotifications([
          ...notifications,
          { title: 'Regular Alert', message: 'There are less than 50 regular items in stock', read: false },
        ])
      }

    }

    fetchData()
    fetchSummaryData()

    const intervalId = setInterval(fetchData, 50000)
    const intervalId2 = setInterval(fetchSummaryData, 50000)

    return () => (clearInterval(intervalId), clearInterval(intervalId2))
    
  }, [])

  const markAsRead = (title : string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.title === title ? { ...notification, read: true } : notification
      )
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9FFE6] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#5AA362]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F9FFE6] flex items-center justify-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    )
  }

  if (!vendorData) {
    return null
  }

  if (!summaryData) {
    return null
  }

  return (
    <div className={`min-h-screen bg-[#F9FFE6] p-8 ${poppins.className}`}>
      <div className="max-w-6xl mx-auto">
        <div className='flex flex-row justify-between align-middle'>
          <h1 className={`${poppinsBold.className} text-4xl font-bold text-gray-800 mb-8`}>Vendor Dashboard</h1>
          <button className={`${poppinsBold.className} text-md font-bold text-gray-800 mb-8 hover:scale-105 transition duration-300`} 
                  onClick={ () => handleLogout() }>logout</button>
        </div>
      
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-5`}>
          <Card className="bg-[#B8D7B3]">
            <CardHeader>
              <CardTitle className="text-gray-800">Vendor Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800"><strong>ID:</strong> {vendorData.id}</p>
              <p className="text-gray-800"><strong>Name:</strong> {vendorData.name || 'N/A'}</p>
              <p className="text-gray-800"><strong>Location:</strong> ({vendorData.x.toFixed(2)}, {vendorData.y.toFixed(2)})</p>
            </CardContent>
          </Card>

          
          
          <Card className="bg-[#B8D7B3]">
            <CardHeader>
              <CardTitle className="text-gray-800">Inventory Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800"><strong>Total Items:</strong> {vendorData.inventory.items.length}</p>
              <p className="text-gray-800">
                <strong>Unique Items:</strong> {new Set(vendorData.inventory.items.map(item => item.name)).size} (
                {Array.from(new Set(vendorData.inventory.items.map(item => item.name))).join(', ')})
              </p>

            </CardContent>
          </Card>

          
        </div>

      <Card className="bg-[#B8D7B3] mb-5">
        <CardHeader>
          <CardTitle className="text-gray-800">Plates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-gray-800">
            
            <div className="flex flex-col items-start">
              <p><strong>Halal</strong></p>
              <p>{summaryData.halal}</p>
              <p><strong>Clean</strong></p>
              <p>{summaryData.halalClean}</p>
              <p><strong>Dirty</strong></p>
              <p>{summaryData.halalDirty}</p>
            </div>
            <div className="flex flex-col items-start">
              <p><strong>Vegen</strong></p>
              <p>{summaryData.veg}</p>
              <p><strong>Clean</strong></p>
              <p>{summaryData.vegClean}</p>
              <p><strong>Dirty</strong></p>
              <p>{summaryData.vegDirty}</p>
            </div>
            <div className="flex flex-col items-start">
              <p><strong>Regular</strong></p>
              <p>{summaryData.reg}</p>
              <p><strong>Clean</strong></p>
              <p>{summaryData.regClean}</p>
              <p><strong>Dirty</strong></p>
              <p>{summaryData.regDirty}</p>
            </div>
            <div className="flex flex-col items-start">
              <p><strong>Total</strong></p>
              <p>{summaryData.plates}</p>
              <p><strong>Clean</strong></p>
              <p>{summaryData.cleanPlates}</p>
              <p><strong>Dirty</strong></p>
              <p>{summaryData.dirtyPlates}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className='grid grid-cols-1 md:grid-cols-2 '>
        <Card className="bg-[#B8D7B3] mb-5 max-w-lg">
          <CardHeader>
            <CardTitle className="text-gray-800">Cups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 text-gray-800">
              <div className="flex flex-col items-start">
                <p><strong>Total</strong></p>
                <p>{summaryData.cups}</p>
                <p><strong>Clean</strong></p>
                <p>{summaryData.cleanCups}</p>
                <p><strong>Dirty</strong></p>
                <p>{summaryData.dirtyCups}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className='p-8 mb-5 border bg-[#B8D7B3] rounded-lg'>
          <h2 className="text-xl font-bold mb-4 text-center text-gray-800 align-top">Notifications</h2>
          {notifications.map((notification) =>
        notification.read ? null : (
          <p key={notification.title} className="text-gray-800 cursor-pointer" onClick={() => markAsRead(notification.title)}>
            {notification.message}
          </p>
        )
      )}
        </div>
      </div>
      
        
        <Card className="bg-[#B8D7B3]">
          <CardHeader>
            <CardTitle className="text-gray-800">Inventory Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className='hover:bg-[#B8D7B3]'>
                    <TableHead className="text-gray-800 font-bold">ID</TableHead>
                    <TableHead className="text-gray-800 font-bold">Name</TableHead>
                    <TableHead className="text-gray-800 font-bold">Type</TableHead>
                    <TableHead className="text-gray-800 font-bold">Status</TableHead>
                    <TableHead className="text-gray-800 font-bold">Size</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendorData.inventory.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-gray-800">{item.id}</TableCell>
                      <TableCell className="text-gray-800">{item.name}</TableCell>
                      <TableCell className="text-gray-800">{item.type || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge className="bg-[#5AA362] text-white">{item.status === "Fresh" ? "Clean" : "Dirty"}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-800">{item.size}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}