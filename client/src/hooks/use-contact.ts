import { useMutation } from "@tanstack/react-query";
import { api, type InsertMessage } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useSubmitContact() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      // Manual validation using Zod schema from routes
      const validated = api.contact.submit.input.parse(data);
      
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
            const errorData = await res.json();
            // Try to parse with the error schema
            const parsedError = api.contact.submit.responses[400].safeParse(errorData);
            if (parsedError.success) {
                throw new Error(parsedError.data.message);
            }
        }
        if (res.status === 500) {
             const errorData = await res.json();
             const parsedError = api.contact.submit.responses[500].safeParse(errorData);
             if (parsedError.success) {
                 throw new Error(parsedError.data.message);
             }
        }
        throw new Error("Xabar yuborishda xatolik yuz berdi");
      }
      
      return api.contact.submit.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Xabar yuborildi!",
        description: "Tez orada siz bilan bog'lanaman.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Xatolik",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
