"use client"

import { useForm, formOptions } from "@tanstack/react-form"; // or react-hook-form if you prefer
import { useEffect, useState } from 'react';
import { Cross, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { loginUser } from "@/features/auth/loginUser";
import { loginSuccess } from "@/app/redux/features/auth/authSlice";




interface FormValues {
  email: string
  password: string
};

const defaultFormValue: FormValues = {email: "", password: ""};

const formOpt = formOptions({
  defaultValues: defaultFormValue,
})

export default function Login () {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      toast.success("Login successful🎉. Redirecting to Dashboard");
      router.push('/dashboard');
    }
  }, [user]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     // Simulate login - replace with actual auth
//     setTimeout(() => {
//       setIsLoading(false);
//       toast.success('Welcome back!');
//       router.push('/dashboard');
//     }, 1000);
//   };


  const form = useForm({
    ...formOpt,
    onSubmit: (values) => {
        const email = values.value.email
        const password = values.value.password
        loginUser({ email, password }, dispatch);
      },
  });

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-warm relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary-bg" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 backdrop-blur flex items-center justify-center mb-8">
            <Cross size={32} />
          </div>
          <h1 className="text-5xl font-display font-bold mb-4">
            Disciple Management
          </h1>
          <p className="text-xl opacity-90 max-w-md">
            Track evangelism, manage prayer groups, and follow up with souls on their spiritual journey.
          </p>
          
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
              <p className="text-3xl font-bold">156</p>
              <p className="text-sm opacity-80">Souls Reached</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
              <p className="text-3xl font-bold">87%</p>
              <p className="text-sm opacity-80">Attendance</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-4">
              <p className="text-3xl font-bold">342</p>
              <p className="text-sm opacity-80">Follow-ups</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8 ">
        <div className="w-full h-full rounded-xl bg-background p-14">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 lg:hidden">
              <Cross size={24} className="text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-2">Sign in to continue your ministry</p>
          </div>

        <form 
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }} 
            className="space-y-6"
        >
            <form.Field 
                name="email"
                validators={{
                    onSubmit: ({value}) => 
                    !value.includes("@") ? "Invalid email" : undefined,
                }} 
            >
                {(field) => (
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <Input
                                id={field.name}
                                type="email"
                                placeholder="e.g team@gmail.com"
                                value={field.state.value}
                                className="pl-10"
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        </div>
                            {!field.state.meta.isValid && (
                                <p className="text-sm text-red-500">
                                    {field.state.meta.errors.join(', ')}
                                </p>
                            )}
                    </div>
                )}
            </form.Field>

            <form.Field 
                name="password"
                validators={{
                    onSubmit: ({value}) => 
                        value.length < 8 ? "Password must be minimum of 8 characters" : undefined
                }} 
            >
                {(field) => (
                    <div className="space-y-2">
                        <Label htmlFor={field.name}>Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <Input
                                id={field.name}
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={field.state.value}
                                className="pl-10 pr-10"
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {!field.state.meta.isValid && (
                            <p className="text-sm text-red-500">
                                {field.state.meta.errors.join(', ')}
                            </p>
                        )}
                    </div>
                )}
            </form.Field>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-secondary-bg hover:underline">Forgot password?</a>
            </div>

            <Button type="submit" variant="outline" size="lg" className="w-full bg-secondary-bg hover:bg-secondary-bg/90 hover:text-bg-white text-white" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account?{' '}
            <a href="#" className="text-primary hover:underline font-medium">Contact admin</a>
          </p>
        </div>
      </div>
    </div>
  );
};
