import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import AdminNavbar from "@/components/AdminNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["overview", "orders", "customers", "plans", "analytics"].includes(tab)) {
      setActiveTab(tab);
    }
    window.scrollTo(0, 0);
  }, [searchParams]);

  const stats = [
    { 
      label: "Total Revenue", 
      value: "$24,580", 
      change: "+12.5%", 
      trend: "up",
      icon: DollarSign, 
      color: "bg-gradient-to-r from-green-500 to-emerald-600" 
    },
    { 
      label: "Active Orders", 
      value: "1,234", 
      change: "+8.2%", 
      trend: "up",
      icon: ShoppingCart, 
      color: "bg-gradient-to-r from-blue-500 to-cyan-600" 
    },
    { 
      label: "Total Customers", 
      value: "2,856", 
      change: "+15.3%", 
      trend: "up",
      icon: Users, 
      color: "bg-gradient-to-r from-purple-500 to-violet-600" 
    },
    { 
      label: "Conversion Rate", 
      value: "3.2%", 
      change: "-2.1%", 
      trend: "down",
      icon: Activity, 
      color: "bg-gradient-to-r from-orange-500 to-red-500" 
    }
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", email: "john@example.com", plan: "10GB - 7 Days", price: 6.48, status: "Completed", date: "2024-01-15", country: "🇯🇵 Japan" },
    { id: "ORD-002", customer: "Jane Smith", email: "jane@example.com", plan: "20GB - 15 Days", price: 13.48, status: "Processing", date: "2024-01-14", country: "🇯🇵 Japan" },
    { id: "ORD-003", customer: "Mike Johnson", email: "mike@example.com", plan: "5GB - 5 Days", price: 3.28, status: "Completed", date: "2024-01-14", country: "🇯🇵 Japan" },
    { id: "ORD-004", customer: "Sarah Williams", email: "sarah@example.com", plan: "30GB - 30 Days", price: 20.39, status: "Pending", date: "2024-01-13", country: "🇯🇵 Japan" },
    { id: "ORD-005", customer: "Tom Brown", email: "tom@example.com", plan: "1GB - 3 Days", price: 1.54, status: "Failed", date: "2024-01-13", country: "🇯🇵 Japan" }
  ];

  const topPlans = [
    { name: "10GB - 7 Days", sales: 245, revenue: 1587.6, growth: 12.5 },
    { name: "20GB - 15 Days", sales: 189, revenue: 2547.72, growth: 8.3 },
    { name: "5GB - 5 Days", sales: 156, revenue: 511.68, growth: 15.2 },
    { name: "30GB - 30 Days", sales: 98, revenue: 1998.22, growth: -2.1 }
  ];

  const customers = [
    { id: "CUST-001", name: "John Doe", email: "john@example.com", orders: 3, spent: 45.20, joined: "2023-12-01", status: "Active" },
    { id: "CUST-002", name: "Jane Smith", email: "jane@example.com", orders: 1, spent: 13.48, joined: "2024-01-10", status: "Active" },
    { id: "CUST-003", name: "Mike Johnson", email: "mike@example.com", orders: 5, spent: 78.90, joined: "2023-11-15", status: "VIP" },
    { id: "CUST-004", name: "Sarah Williams", email: "sarah@example.com", orders: 2, spent: 33.87, joined: "2024-01-05", status: "Active" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700 border-green-200";
      case "Processing": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Failed": return "bg-red-100 text-red-700 border-red-200";
      case "Active": return "bg-green-100 text-green-700 border-green-200";
      case "VIP": return "bg-purple-100 text-purple-700 border-purple-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">Monitor and manage your Japan eSIM business</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      )}
                      <span className={cn(
                        "text-xs font-medium",
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      )}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.color)}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Orders */}
              <Card className="lg:col-span-2 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Recent Orders
                  </CardTitle>
                  <CardDescription>Latest customer orders and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                            {order.customer.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-sm text-muted-foreground">{order.plan}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${order.price}</p>
                          <Badge className={cn("text-xs", getStatusColor(order.status))}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Plans */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Top Plans
                  </CardTitle>
                  <CardDescription>Best performing eSIM plans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPlans.map((plan, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{plan.name}</p>
                          <span className={cn(
                            "text-xs font-medium",
                            plan.growth > 0 ? "text-green-600" : "text-red-600"
                          )}>
                            {plan.growth > 0 ? "+" : ""}{plan.growth}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{plan.sales} sales</span>
                          <span>${plan.revenue.toFixed(2)}</span>
                        </div>
                        <Progress value={(plan.sales / 250) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Order Management</CardTitle>
                    <CardDescription>View and manage all customer orders</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search orders..." 
                        className="pl-10 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                        <th className="text-left py-3 px-4 font-semibold">Customer</th>
                        <th className="text-left py-3 px-4 font-semibold">Plan</th>
                        <th className="text-left py-3 px-4 font-semibold">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Date</th>
                        <th className="text-left py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-4 font-medium">{order.id}</td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium">{order.customer}</p>
                              <p className="text-sm text-muted-foreground">{order.email}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium">{order.plan}</p>
                              <p className="text-sm text-muted-foreground">{order.country}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-semibold">${order.price}</td>
                          <td className="py-4 px-4">
                            <Badge className={cn("text-xs", getStatusColor(order.status))}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">{order.date}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Customer Management</CardTitle>
                    <CardDescription>Manage your customer base and relationships</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Customer
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Customer</th>
                        <th className="text-left py-3 px-4 font-semibold">Email</th>
                        <th className="text-left py-3 px-4 font-semibold">Orders</th>
                        <th className="text-left py-3 px-4 font-semibold">Total Spent</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Joined</th>
                        <th className="text-left py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer.id} className="border-b hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                                {customer.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-medium">{customer.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">{customer.email}</td>
                          <td className="py-4 px-4 font-medium">{customer.orders}</td>
                          <td className="py-4 px-4 font-semibold">${customer.spent}</td>
                          <td className="py-4 px-4">
                            <Badge className={cn("text-xs", getStatusColor(customer.status))}>
                              {customer.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">{customer.joined}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Plan Management</CardTitle>
                    <CardDescription>Manage your eSIM data plans and pricing</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Plan
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topPlans.map((plan, index) => (
                    <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                        <CardDescription>Japan eSIM Data Plan</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Sales</span>
                            <span className="font-semibold">{plan.sales}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Revenue</span>
                            <span className="font-semibold">${plan.revenue.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Growth</span>
                            <span className={cn(
                              "font-semibold",
                              plan.growth > 0 ? "text-green-600" : "text-red-600"
                            )}>
                              {plan.growth > 0 ? "+" : ""}{plan.growth}%
                            </span>
                          </div>
                          <Progress value={(plan.sales / 250) * 100} className="h-2" />
                          <div className="flex gap-2 pt-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Monthly revenue breakdown and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">January 2024</p>
                        <p className="text-2xl font-bold text-green-700">$24,580</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">December 2023</span>
                        <span className="font-semibold">$21,230</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">November 2023</span>
                        <span className="font-semibold">$19,870</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">October 2023</span>
                        <span className="font-semibold">$18,450</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Customer Analytics</CardTitle>
                  <CardDescription>Customer acquisition and retention metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-muted-foreground">New Customers</p>
                        <p className="text-xl font-bold text-blue-700">156</p>
                        <p className="text-xs text-green-600">+12% from last month</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Retention Rate</p>
                        <p className="text-xl font-bold text-purple-700">87%</p>
                        <p className="text-xs text-green-600">+3% from last month</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Active Customers</span>
                        <span className="font-semibold">2,456</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">VIP Customers</span>
                        <span className="font-semibold">89</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Avg. Order Value</span>
                        <span className="font-semibold">$8.62</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
