"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

type Notification = {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  type: "success" | "error" | "info" | "warning";
  read: boolean;
};

const notifications: Notification[] = [
  {
    id: 1,
    title: "Welcome to Hyper Cleaning!",
    description: "Thank you for signing up. Explore our features.",
    timestamp: "2 minutes ago",
    type: "success",
    read: false,
  },
  {
    id: 2,
    title: "Payment Failed",
    description: "There was an issue with your payment method.",
    timestamp: "6 minutes ago",
    type: "error",
    read: false,
  },
  {
    id: 3,
    title: "Order Shipped",
    description: "Your order #1234 has shipped.",
    timestamp: "1 hour ago",
    type: "info",
    read: false,
  },
  {
    id: 4,
    title: "New Product Available",
    description: "The item on your wishlist is now back in stock!",
    timestamp: "1 hour ago",
    type: "info",
    read: true,
  },
  {
    id: 5,
    title: "Discount Available!",
    description: "Get 10% off your next purchase.",
    timestamp: "2 days ago",
    type: "warning",
    read: true,
  },
];

const NotificationBtn = () => {
  const [notificationList, setNotificationList] = useState(notifications);
  const unreadCount = notificationList.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismissNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotificationList([]);
  };

  const getDotColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative mr-[14px] p-1">
          <Image
            priority
            src="/icons/envelope.svg"
            height={100}
            width={100}
            alt="notifications"
            className="max-w-[22px] max-h-[22px]"
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-bold text-lg">Notifications</h3>
            <button
              onClick={markAllAsRead}
              className="text-sm text-black hover:underline"
            >
              Mark all as read
            </button>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto max-h-[400px]">
            {notificationList.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notificationList.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 p-4 border-b hover:bg-gray-50 transition-colors"
                >
                  {/* Colored Dot */}
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getDotColor(
                      notification.type
                    )}`}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.description}
                        </p>
                        <span className="text-xs text-gray-400">
                          {notification.timestamp}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            aria-label="Mark as read"
                          >
                            <Check className="w-4 h-4 text-gray-600" />
                          </button>
                        )}
                        <button
                          onClick={() => dismissNotification(notification.id)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                          aria-label="Dismiss"
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notificationList.length > 0 && (
            <div className="p-4 border-t">
              <Button
                onClick={clearAll}
                variant="outline"
                className="w-full"
              >
                Clear all notifications
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBtn;


