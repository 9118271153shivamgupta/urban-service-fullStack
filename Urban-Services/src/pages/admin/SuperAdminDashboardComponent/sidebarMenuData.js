// src/pages/admin/SuperAdminDashboardComponent/sidebarMenuData.js
import { 
  LayoutDashboard, Users, ClipboardList, Grid, MapPin, 
  ShieldAlert, HardHat, CheckCircle, XCircle, ListFilter, 
  CreditCard, Star, Settings, BellRing, BarChart3, 
  ShieldCheck, Wallet, MessageSquare, Sliders, Eye, 
  PlusCircle, Wrench, Plus // <- यहाँ हमने 'Plus' को इम्पोर्ट कर लिया है
} from 'lucide-react';

export const sidebarMenuData = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: LayoutDashboard,
    type: 'single',
  },
  {
    id: 'user-management-parent',
    title: 'User Management',
    icon: Users,
    type: 'parent',
    stateKey: 'openUserSub',
    matchKeywords: ['user-management', 'Admins'],
    subMenus: [
      { id: 'user-management', title: 'Master Sheet', type: 'link', dotColor: 'bg-blue-500' },
      { id: 'Admins', title: 'All Admins', icon: ShieldAlert, type: 'link' },
      { id: 'admin', title: 'Add Admin +', icon: Plus, type: 'modal', hoverClass: 'hover:text-green-400' } // <- डायरेक्ट 'Plus' रख दिया
    ]
  },
  {
    id: 'providers-parent',
    title: 'Service Providers',
    icon: HardHat,
    type: 'parent',
    stateKey: 'openProviderSub',
    matchKeywords: ['Providers'],
    subMenus: [
      { id: 'Providers', title: 'All Providers', type: 'link', dotColor: 'bg-orange-500' },
      { id: 'provider', title: 'Add Provider +', icon: Plus, type: 'modal', hoverClass: 'hover:text-orange-400' } // <- डायरेक्ट 'Plus' रख दिया
    ]
  },
  {
    id: 'bookings-parent',
    title: 'Services Booking',
    icon: ClipboardList,
    type: 'parent',
    stateKey: 'openBookingSub',
    matchKeywords: ['bookings'],
    subMenus: [
      { id: 'bookings', title: 'Booking List', icon: ListFilter, type: 'link' },
      // { id: 'bookings-accepted', title: 'Accepted / Live', icon: CheckCircle, type: 'link', activeColor: 'text-green-400' },
      // { id: 'bookings-rejected', title: 'Rejected / Cancelled', icon: XCircle, type: 'link', activeColor: 'text-rose-400' }
    ]
  },
  {
    id: 'payments-parent',
    title: 'Payments & Finance',
    icon: CreditCard,
    type: 'parent',
    stateKey: 'openPaymentSub',
    matchKeywords: ['payment'],
    subMenus: [
      { id: 'payment-transactions', title: 'All Transactions', icon: Wallet, type: 'link' },
      { id: 'payment-settlements', title: 'Provider Payouts', icon: ShieldCheck, type: 'link' }
    ]
  },
  {
    id: 'reviews-parent',
    title: 'Reviews & Feedback',
    icon: Star,
    type: 'parent',
    stateKey: 'openReviewSub',
    matchKeywords: ['reviews'],
    subMenus: [
      { id: 'reviews-customer', title: 'Customer Reviews', icon: MessageSquare, type: 'link' },
      { id: 'reviews-moderation', title: 'Moderation Flags', icon: Eye, type: 'link' }
    ]
  },
  {
    id: 'reports-parent',
    title: 'Reports & Data',
    icon: BarChart3,
    type: 'parent',
    stateKey: 'openReportSub',
    matchKeywords: ['reports'],
    subMenus: [
      { id: 'reports-sales', title: 'Sales Reports', type: 'link', dotColor: 'bg-purple-500' },
      { id: 'reports-users', title: 'User Analytics', type: 'link', dotColor: 'bg-purple-500' }
    ]
  },
  {
    id: 'services-master-parent',
    title: 'Services Master',
    icon: Wrench,
    type: 'parent',
    stateKey: 'openServiceMasterSub',
    matchKeywords: ['services-master'],
    subMenus: [
      { id: 'services-master-all', title: 'All Services List', type: 'link', dotColor: 'bg-indigo-500' },
      { id: 'services-master-add', title: 'Add New Service', icon: PlusCircle, type: 'link' }
    ]
  },
  {
    id: 'categories',
    title: 'Categories',
    icon: Grid,
    type: 'single',
  },
  {
    id: 'city',
    title: 'City Master',
    icon: MapPin,
    type: 'single',
  },
  {
    id: 'settings-parent',
    title: 'App Settings',
    icon: Settings,
    type: 'parent',
    stateKey: 'openSettingsSub',
    matchKeywords: ['settings'],
    subMenus: [
      { id: 'settings-gateway', title: 'Payment Gateway', icon: Sliders, type: 'link' },
      { id: 'settings-sms', title: 'SMS/OTP Panels', icon: BellRing, type: 'link' }
    ]
  }
];