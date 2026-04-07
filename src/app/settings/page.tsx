"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ListingInnerPage } from "@/components/listing-site/listing-inner-page"
import { ListingSiteShell } from "@/components/listing-site/listing-site-shell"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const router = useRouter()
  const { user, logout, updateUser } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const avatarInputRef = useRef<HTMLInputElement | null>(null)
  const coverInputRef = useRef<HTMLInputElement | null>(null)
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [bio, setBio] = useState(user?.bio || "")
  const [location, setLocation] = useState(user?.location || "")
  const [website, setWebsite] = useState(user?.website || "")

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings saved",
        description: "Your profile was updated.",
      })
    }, 1000)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  useEffect(() => {
    if (!user) return
    setName(user.name)
    setEmail(user.email)
    setBio(user.bio)
    setLocation(user.location || "")
    setWebsite(user.website || "")
  }, [user])

  const notifyProfileUpdate = () => {
    window.dispatchEvent(new CustomEvent("nexus-profile-updated"))
  }

  const handleProfileSave = () => {
    if (!user) return
    updateUser({
      name: name.trim() || user.name,
      email: email.trim() || user.email,
      bio: bio.trim() || user.bio,
      location: location.trim() || undefined,
      website: website.trim() || undefined,
    })
    notifyProfileUpdate()
    handleSave()
    setIsEditingProfile(false)
  }

  const handleAvatarUpload = (file: File | null) => {
    if (!file || !user) return
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image." })
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max size is 2MB." })
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : ""
      updateUser({ avatar: result })
      toast({ title: "Avatar updated", description: "Your profile photo was updated." })
    }
    reader.readAsDataURL(file)
  }

  const handleCoverUpload = (file: File | null) => {
    if (!file || !user) return
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image." })
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max size is 2MB." })
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : ""
      updateUser({ coverImage: result })
      notifyProfileUpdate()
      toast({ title: "Cover updated", description: "Your cover image was updated." })
    }
    reader.readAsDataURL(file)
  }

  const handleProfileCancel = () => {
    if (!user) return
    setName(user.name)
    setEmail(user.email)
    setBio(user.bio)
    setLocation(user.location || "")
    setWebsite(user.website || "")
    toast({ title: "Changes discarded", description: "Profile updates were not saved." })
    setIsEditingProfile(false)
  }

  return (
    <ListingSiteShell>
      <ListingInnerPage title="Profile" description="Update your account details.">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
              <User className="h-5 w-5 text-primary" aria-hidden />
              <h2
                className="text-lg font-semibold text-atlas-ink"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Profile information
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-2xl">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
                    onClick={() => {
                      if (!isEditingProfile) {
                        toast({ title: "Edit mode required", description: "Click Edit profile to upload." })
                        return
                      }
                      avatarInputRef.current?.click()
                    }}
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <Input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => handleAvatarUpload(event.target.files?.[0] ?? null)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (!isEditingProfile) {
                        toast({ title: "Edit mode required", description: "Click Edit profile to upload." })
                        return
                      }
                      avatarInputRef.current?.click()
                    }}
                  >
                    Upload new photo
                  </Button>
                  <p className="mt-2 text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-xl border border-border">
                  <div
                    className="h-32 w-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${user?.coverImage || "/placeholder.svg?height=320&width=1280"})`,
                    }}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => handleCoverUpload(event.target.files?.[0] ?? null)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (!isEditingProfile) {
                        toast({ title: "Edit mode required", description: "Click Edit profile to upload." })
                        return
                      }
                      coverInputRef.current?.click()
                    }}
                  >
                    Upload cover image
                  </Button>
                  <span className="text-xs text-muted-foreground">Recommended 1280×320.</span>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    disabled={!isEditingProfile}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled={!isEditingProfile}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself"
                    rows={4}
                    disabled={!isEditingProfile}
                  />
                  <p className="text-xs text-muted-foreground">Brief description for your profile.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, Country"
                    disabled={!isEditingProfile}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://"
                    disabled={!isEditingProfile}
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-3 pt-2">
                {isEditingProfile ? (
                  <>
                    <Button variant="outline" onClick={handleProfileCancel}>
                      Cancel
                    </Button>
                    <Button onClick={handleProfileSave} disabled={isSaving}>
                      {isSaving ? "Saving…" : "Save changes"}
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditingProfile(true)}>Edit profile</Button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </div>
      </ListingInnerPage>
    </ListingSiteShell>
  )
}
