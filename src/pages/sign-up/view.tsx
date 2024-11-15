import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import logo from '../../assets/logo_c.png'
import { RegisterUserType } from '@/lib/interface'
import { register } from '@/lib/api'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'

export default function SignUpView() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState<'ADMIN'|'CONTRIBUTOR' >('CONTRIBUTOR')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload:RegisterUserType = {
        email, password, username, firstName, lastName, role,
        _id: undefined
      }
      const {data} = await register(payload) as unknown as any
      if(data){
        toast({
          title: "Success",
          description: "Register Success, Wait For Approval",
        })
      }
    } catch (error:any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: `${error.response.data.error}`,
      })
    }
    // navigate('/dashboard')
  }

  return (
    <div className="flex w-full min-h-screen">
      {/* Logo Section */}
      <div className="items-center justify-center hidden w-1/2 bg-gray-100 lg:flex">
        <div className="text-center">
          <img src={logo}  />
        <h1 className="mt-4 text-4xl font-bold text-gray-900">Your Company</h1>
          <p className="mt-2 text-xl text-gray-600">Welcome back!</p>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex items-center justify-center w-full px-6 py-12 lg:w-1/2">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your details to access your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  type="text" 
                  placeholder="Enter your username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  type="text" 
                  placeholder="Enter your first name" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  type="text" 
                  placeholder="Enter your last name" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={(e) => {
                  switch (e) {
                    case "ADMIN":
                      setRole('ADMIN')
                      break;
                    default:
                      setRole('CONTRIBUTOR')
                      break;
                  }
                }} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="CONTRIBUTOR">Contributor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Sign Up</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <Toaster  />
    </div>
  )
}