import { useState, useEffect } from "react";
import { 
  Users, 
  ShoppingCart, 
  BarChart3, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Globe,
  Calendar,
  Wifi,
  Clock,
  MapPin,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");

  const stats = [
    { 
      label: "Total Revenue", 
      value: "$24,580", 
      change: "+12.5%", 
      trend: "up",
      icon: DollarSign, 
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      description: "vs last month"
    },
    { 
      label: "Active Orders", 
      value: "1,234", 
      change: "+8.2%", 
      trend: "up",
      icon: ShoppingCart, 
      color: "bg-gradient-to-r from-blue-500 to-cyan-600",
      description: "pending & processing"
    },
    { 
      label: "Total Customers", 
      value: "2,856", 
      change: "+15.3%", 
      trend: "up",
      icon: Users, 
      color: "bg-gradient-to-r from-purple-500 to-violet-600",
      description: "registered users"
    },
    { 
      label: "Conversion Rate", 
      value: "3.2%", 
      change: "-2.1%", 
      trend: "down",
      icon: Activity, 
      color: "bg-gradient-to-r from-orange-500 to-red-500",
      description: "visitor to customer"
    }
  ];

  const recentActivity = [
    { 
      id: 1, 
      type: "order", 
      message: "New order #ORD-1234 from John Doe", 
      time: "2 minutes ago", 
      status: "success",
      icon: ShoppingCart
    },
    { 
      id: 2, 
      type: "customer", 
      message: "New customer registration: jane@example.com", 
      time: "5 minutes ago", 
      status: "info",
      icon: Users
    },
    { 
      id: 3, 
      type: "payment", 
      message: "Payment failed for order #ORD-1230", 
      time: "12 minutes ago", 
      status: "error",
      icon: XCircle
    },
    { 
      id: 4, 
      type: "system", 
      message: "eSIM activation completed for order #ORD-1229", 
      time: "18 minutes ago", 
      status: "success",
      icon: CheckCircle
    },
    { 
      id: 5, 
      type: "alert", 
      message: "Low stock alert: 5GB plans running low", 
      time: "25 minutes ago", 
      status: "warning",
      icon: AlertCircle
    }
  ];

  const topPlans = [
    { 
      name: "10GB - 7 Days", 
      sales: 245, 
      revenue: 1587.6, 
      growth: 12.5,
      price: 6.48,
      popularity: 85
    },
    { 
      name: "20GB - 15 Days", 
      sales: 189, 
      revenue: 2547.72, 
      growth: 8.3,
      price: 13.48,
      popularity: 72
    },
    { 
      name: "5GB - 5 Days", 
      sales: 156, 
      revenue: 511.68, 
      growth: 15.2,
      price: 3.28,
      popularity: 68
    },
    { 
      name: "30GB - 30 Days", 
      sales: 98, 
      revenue: 1998.22, 
      growth: -2.1,
      price: 20.39,
      popularity: 45
    }
  ];

  const recentOrders = [
    { 
      id: "ORD-001", 
      customer: "John Doe", 
      email: "john@example.com", 
      plan: "10GB - 7 Days", 
      price: 6.48, 
      status: "Completed", 
      date: "2024-01-15",
      country: "🇯🇵 Japan",
      activationTime: "2 mins"
    },
    { 
      id: "ORD-002", 
      customer: "Jane Smith", 
      email: "jane@example.com", 
      plan: "20GB - 15 Days", 
      price: 13.48, 
      status: "Processing", 
      date: "2024-01-14",
      country: "🇯🇵 Japan",
      activationTime: "Pending"
    },
    { 
      id: "ORD-003", 
      customer: "Mike Johnson", 
      email: "mike@example.com", 
      plan: "5GB - 5 Days", 
      price: 3.28, 
      status: "Completed", 
      date: "2024-01-14",
      country: "🇯🇵 Japan",
      activationTime: "1 min"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700 border-green-200";
      case "Processing": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Failed": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case "success": return "text-green-600 bg-green-50";
      case "error": return "text-red-600 bg-red-50";
      case "warning": return "text-yellow-600 bg-yellow-50";
      case "info": return "text-blue-600 bg-blue-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <AdminLayout 
      title="Dashboard Overview" 
      description="Monitor your Japan eSIM business performance and key metrics"
    >
      {/* Time Range Selector */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border">
          {["24h", "7d", "30d", "90d"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                timeRange === range
                  ? "bg-blue-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      )}
                      <span className={cn(
                        "text-sm font-medium",
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      )}>
                        {stat.change}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{stat.description}</span>
                  </div>
                </div>
                <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform", stat.color)}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 shadow-lg border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Recent Orders
                </CardTitle>
                <CardDescription>Latest customer orders and their status</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-50/50 hover:from-blue-50 hover:to-purple-50 transition-all duration-200 border border-gray-100 hover:border-blue-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                      {order.customer.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.plan}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{order.country}</span>
                        <span className="text-xs">•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{order.activationTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${order.price}</p>
                    <Badge className={cn("text-xs mt-1", getStatusColor(order.status))}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>System events and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", getActivityColor(activity.status))}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 leading-tight">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Plans Performance */}
      <Card className="shadow-lg border-0 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Top Performing Plans
          </CardTitle>
          <CardDescription>Best selling eSIM plans with performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topPlans.map((plan, index) => (
              <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Wifi className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    {plan.growth > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={cn(
                      "text-sm font-medium",
                      plan.growth > 0 ? "text-green-600" : "text-red-600"
                    )}>
                      {plan.growth > 0 ? "+" : ""}{plan.growth}%
                    </span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-4">${plan.price}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Sales</span>
                    <span className="font-semibold">{plan.sales}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Revenue</span>
                    <span className="font-semibold">${plan.revenue.toFixed(2)}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Popularity</span>
                      <span className="text-sm font-medium">{plan.popularity}%</span>
                    </div>
                    <Progress value={plan.popularity} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              <Users className="h-5 w-5" />
              <span className="text-sm">Add Customer</span>
            </Button>
            <Button className="h-20 flex-col gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm">New Order</span>
            </Button>
            <Button className="h-20 flex-col gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
              <Wifi className="h-5 w-5" />
              <span className="text-sm">Add Plan</span>
            </Button>
            <Button className="h-20 flex-col gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm">View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminDashboard;