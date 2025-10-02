"use client";

import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
  children?: MenuItem[];
}

export interface AccessibleMenuProps {
  items: MenuItem[];
  trigger: React.ReactNode;
  className?: string;
  menuClassName?: string;
  align?: "left" | "right";
  size?: "sm" | "md" | "lg";
}

const AccessibleMenu: React.FC<AccessibleMenuProps> = ({
  items,
  trigger,
  className,
  menuClassName,
  align = "right",
  size = "md",
}) => {
  // const [_isOpen, _setIsOpen] = useState(false);

  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const alignments = {
    left: "left-0",
    right: "right-0",
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    if (item.divider) {
      return (
        <div
          key={`divider-${index}`}
          className="border-t border-gray-200 my-1"
          role="separator"
        />
      );
    }

    if (item.children && item.children.length > 0) {
      return (
        <div key={`submenu-${index}`} className="relative">
          <Menu as="div" className="relative">
            <Menu.Button
              className={cn(
                "group flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900",
                sizes[size],
                item.disabled && "opacity-50 cursor-not-allowed"
              )}
              disabled={item.disabled}
            >
              {item.icon && (
                <span className="mr-3 flex-shrink-0" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <span className="flex-1 text-right">{item.label}</span>
              <ChevronDownIcon
                className="mr-2 h-4 w-4 flex-shrink-0"
                aria-hidden="true"
              />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                className={cn(
                  "absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none",
                  alignments[align]
                )}
              >
                <div className="py-1">
                  {item.children.map((child, childIndex) => (
                    <Menu.Item key={childIndex}>
                      {({ active }) => (
                        <button
                          onClick={child.onClick}
                          className={cn(
                            "group flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900",
                            sizes[size],
                            active && "bg-gray-100",
                            child.disabled && "opacity-50 cursor-not-allowed"
                          )}
                          disabled={child.disabled}
                        >
                          {child.icon && (
                            <span
                              className="mr-3 flex-shrink-0"
                              aria-hidden="true"
                            >
                              {child.icon}
                            </span>
                          )}
                          <span className="flex-1 text-right">
                            {child.label}
                          </span>
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      );
    }

    return (
      <Menu.Item key={index}>
        {({ active }) => (
          <button
            onClick={item.onClick}
            className={cn(
              "group flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900",
              sizes[size],
              active && "bg-gray-100",
              item.disabled && "opacity-50 cursor-not-allowed"
            )}
            disabled={item.disabled}
          >
            {item.icon && (
              <span className="mr-3 flex-shrink-0" aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span className="flex-1 text-right">{item.label}</span>
          </button>
        )}
      </Menu.Item>
    );
  };

  return (
    <Menu as="div" className={cn("relative inline-block text-left", className)}>
      <Menu.Button
        className="inline-flex w-full justify-center items-center focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        aria-expanded={false}
        aria-haspopup="true"
      >
        {trigger}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={cn(
            "absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none",
            alignments[align],
            menuClassName
          )}
        >
          <div className="py-1">
            {items.map((item, index) => renderMenuItem(item, index))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AccessibleMenu;
