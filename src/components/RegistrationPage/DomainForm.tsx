/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DomainInputSchema } from "@/model/data/interfaces";
import { domainCheck } from "@/model/api/DomainCheck";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";

type FormInput = z.infer<typeof DomainInputSchema>;

export function DomainForm() {
  const [domainError, setDomainError] = useState<string | null>();

  const form = useForm<FormInput>({
    resolver: zodResolver(DomainInputSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      domain: "",
      location: "",
      category: "",
      currency: "",
      email: "",
    },
  });

  const domainValidity = async (data: string) => {
    const domain = data.trim();
    
    if (!domain) {
      setDomainError(null);
      return;
    }

    setDomainError(null);

    const domainExists = await domainCheck(domain);
    if (domainExists) {
      console.log(domain);
      setDomainError("This domain name is already taken.");
      console.log(domainError);

      form.setError("domain", {
        type: "manual",
        message: "This domain name is already taken.",
      });
    } else {
      form.clearErrors("domain");
      setDomainError(null);
    }

  };

  async function onSubmit(data: FormInput): Promise<void> {
    //form.clearErrors("domain");
    //setErrorMessage(null);
    //setMatchDomain(undefined);

    if (domainError) return;

    try {
      console.log(data)

      const response = await axios.post("https://interview-task-green.vercel.app/task/stores/create", data, {
        headers: {
        'Content-Type': 'application/json',
        // Add other headers if needed, e.g. Authorization
       }
      });
      console.log('Response:', response.data);

      alert("Form submitted successfully!"); //alert("Form submitted successfully!" + JSON.stringify(data, null, 2));
      form.reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
      form.setError("root", {
        message: "Something went wrong",
      });
      console.log(error);
    }
  }

  return (
    <div className="py-5 px-4">
      <Card className="min-w-[90%]">
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="flex">
                <div className="space-y-4">


                  <FormField
                    control={form.control}
                    name="name"
                    /* rules={{ required: "Name is required" }} */
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input className="w-full" placeholder="Enter your shop name" {...field} />
                          {}
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="domain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <Input
                            //className="w-full"
                            {...field}
                            placeholder="Enter your domain"
                            onBlur={async (e) => {
                              field.onBlur();
                              await domainValidity(e.target.value);
                            }}
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage>{form.formState.errors.domain?.message || domainError}</FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Enter your shop location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="bangladesh" className="capitalize">
                              bangladesh
                            </SelectItem>
                            {/* <SelectItem value="second" className="capitalize">
                              second
                            </SelectItem>
                            <SelectItem value="third" className="capitalize">
                              third
                            </SelectItem> */}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Enter your shop category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="first" className="capitalize">
                              first
                            </SelectItem>
                            <SelectItem value="second" className="capitalize">
                              second
                            </SelectItem>
                            <SelectItem value="third" className="capitalize">
                              third
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Enter your shop currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="bdt" className="">
                              BDT
                            </SelectItem>
                            {/* <SelectItem value="second" className="capitalize">
                              second
                            </SelectItem>
                            <SelectItem value="third" className="capitalize">
                              third
                            </SelectItem> */}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input className="w-full" placeholder="Enter your email" {...field} />
                          {}
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* <FormField
                    control={form.control}
                    name=""
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="w-full" {...field} />
                          {}
                        </FormControl>
                      </FormItem>
                    )}
                  /> */}
                </div>
              </div>
              <Button type="submit" disabled={form.formState.isSubmitting}>Register</Button>
            </form>
          </Form>

          {/* <div className="">
            {matchDomain !== undefined && (
                <p>{matchDomain ? "This domain is not available." : "This domain is available!"}</p>
            )}
        </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
