"use client";

import React from "react";
import { Coffee, Bike, Tent, Wrench, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const extras = [
  {
    id: "coffee",
    title: "Coffee Station",
    icon: Coffee,
    action: "Add Coffee Machine",
    items: [
      { id: "espresso-1", name: "Breville Espresso", price: 45 },
      { id: "v60-1", name: "V60 Pour Over Set", price: 15 },
    ]
  },
  {
    id: "outdoor",
    title: "Outdoor Gear",
    icon: Bike,
    action: "Add Surfboard",
    items: [
      { id: "surf-1", name: "Longboard 9'0", price: 60 },
      { id: "scooter-1", name: "Nmax Scooter", price: 120 },
    ]
  },
  {
    id: "relax",
    title: "Relax Zone",
    icon: Tent,
    action: "Add Bean Bag",
    items: [
      { id: "bean-1", name: "Jumbo Bean Bag", price: 20 },
      { id: "hammock-1", name: "Balcony Hammock", price: 15 },
    ]
  },
  {
    id: "garage",
    title: "Garage Space",
    icon: Wrench,
    action: "Add Tool Shelf",
    items: [
      { id: "shelf-1", name: "Steel Tool Shelf", price: 25 },
      { id: "tools-1", name: "Basic Toolkit", price: 10 },
    ]
  }
];

export function LifestyleExtras() {
  const [selectedExtras, setSelectedExtras] = React.useState<string[]>([]);

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="mt-16 pt-12 border-t border-border/60">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-3">
          Ready to Rent?
        </h2>
        <div className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 font-bold text-sm shadow-sm border border-emerald-200 dark:border-emerald-800">
          Rent Your Setup!
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {extras.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.id} className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/60">
                <div className="p-2.5 bg-muted rounded-xl text-foreground">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">{section.title}</h3>
              </div>
              
              <div className="space-y-3">
                {section.items.map(item => {
                  const isSelected = selectedExtras.includes(item.id);
                  return (
                    <div 
                      key={item.id} 
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                        isSelected 
                          ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10" 
                          : "border-border/60 hover:border-border"
                      }`}
                      onClick={() => toggleExtra(item.id)}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-xs text-muted-foreground">${item.price}/mo</span>
                      </div>
                      <Button 
                        size="icon" 
                        variant={isSelected ? "default" : "outline"} 
                        className={`w-7 h-7 rounded-full ${isSelected ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}`}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
