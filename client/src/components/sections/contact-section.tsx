import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Mail, Phone, Clock, CheckCircle, Send, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useSound } from "@/hooks/use-sound";
import { apiRequest } from "@/lib/queryClient";
import investorVideo from "@assets/3817291797-preview_1759197631629.mp4";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  investorType: z.string().min(1, "Please select an investor type"),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  const { playSuccessSound, playClickSound } = useSound();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      investorType: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      playSuccessSound();
      setShowSuccess(true);
      form.reset();
      toast({
        title: "Message Sent!",
        description: "Thank you for your interest. We'll be in touch soon.",
      });
      
      // Reset success state after animation
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Invalidate contact requests cache
      queryClient.invalidateQueries({ queryKey: ["/api/contact-requests"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    playClickSound();
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={investorVideo} type="video/mp4" />
      </video>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Contact / Investor Access
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to explore investment opportunities? Get in touch with our team
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card glass-effect hover-lift">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-6">Get In Touch</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/20 rounded-full p-3">
                      <MapPin className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Address</p>
                      <p className="text-muted-foreground text-sm">
                        Jain Global LLC<br />
                        9 West 57th Street, 39th Floor<br />
                        New York, NY 10019
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-secondary/20 rounded-full p-3">
                      <Mail className="text-secondary h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <p className="text-muted-foreground">contact@jainglobal.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-accent/20 rounded-full p-3">
                      <Phone className="text-accent h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <p className="text-muted-foreground">+1 (212) 555-0123</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="bg-card glass-effect">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-primary h-5 w-5" />
                  <h4 className="text-lg font-semibold text-foreground">Office Hours</h4>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <p>Monday - Friday: 8:00 AM - 6:00 PM EST</p>
                  <p>Saturday: 9:00 AM - 1:00 PM EST</p>
                  <p>Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card glass-effect">
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your full name"
                              className="form-field"
                              data-testid="contact-name-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Enter your email address"
                              className="form-field"
                              data-testid="contact-email-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="investorType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Investor Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="form-field" data-testid="contact-investor-type-select">
                                <SelectValue placeholder="Select investor type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="accredited">Accredited Investor</SelectItem>
                              <SelectItem value="institutional">Institutional Investor</SelectItem>
                              <SelectItem value="advisor">Financial Advisor</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Tell us about your investment objectives..."
                              className="form-field resize-none"
                              rows={4}
                              data-testid="contact-message-textarea"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Optional Document Upload
                      </label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2 mx-auto" />
                        <p className="text-muted-foreground text-sm">
                          Drag & drop files here or click to browse
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          data-testid="contact-file-input"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full py-4 text-lg font-semibold hover-lift"
                      disabled={isSubmitting || showSuccess}
                      data-testid="contact-submit-btn"
                    >
                      {showSuccess ? (
                        <>
                          <CheckCircle className="mr-2 h-5 w-5" />
                          Message Sent!
                        </>
                      ) : isSubmitting ? (
                        <>
                          <motion.div
                            className="mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Submit Request
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
