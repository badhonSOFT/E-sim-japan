import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, DollarSign, Users, Download, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import AdminNavbar from "@/components/AdminNavbar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const AdminReports = () => {
  const [dateRange, setDateRange] = useState("30");
  const [reportType, setReportType] = useState("overview");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const overviewStats = [
    { label: "Total Revenue", value: "$45,230", change: "+12.5%", trend: "up", icon: DollarSign },
    { label: "Total Orders", value: "1,847", change: "+8.2%", trend: "up", icon: BarChart3 },
    { label: "New Customers", value: "324", change: "+15.3%", trend: "up", icon: Users },
    { label: "Avg Order Value", value: "$24.50", change: "-2.1%", trend: "down", icon: TrendingUp }
  ];

  const salesByPlan = [
    { plan: "10GB - 7 Days", sales: 245, revenue: "$1,587.60", percentage: 28 },
    { plan: "20GB - 15 Days", sales: 189, revenue: "$2,547.72", percentage: 22 },
    { plan: "5GB - 5 Days", sales: 156, revenue: "$511.68", percentage: 18 },
    { plan: "30GB - 30 Days", sales: 134, revenue: "$2,732.26", percentage: 15 },
    { plan: "50GB - 30 Days", sales: 98, revenue: "$3,057.60", percentage: 11 },
    { plan: "Others", sales: 45, revenue: "$892.45", percentage: 6 }
  ];

  const monthlyRevenue = [
    { month: "Jan 2024", revenue: 45230, orders: 1847 },
    { month: "Dec 2023", revenue: 38420, orders: 1654 },
    { month: "Nov 2023", revenue: 35680, orders: 1523 },
    { month: "Oct 2023", revenue: 32150, orders: 1398 },
    { month: "Sep 2023", revenue: 29870, orders: 1287 },
    { month: "Aug 2023", revenue: 27340, orders: 1156 }
  ];

  const topCustomers = [
    { name: "John Doe", email: "john@example.com", orders: 12, spent: "$287.50" },
    { name: "Jane Smith", email: "jane@example.com", orders: 8, spent: "$195.20" },
    { name: "Mike Johnson", email: "mike@example.com", orders: 7, spent: "$168.90" },
    { name: "Sarah Williams", email: "sarah@example.com", orders: 6, spent: "$142.30" },
    { name: "Tom Brown", email: "tom@example.com", orders: 5, spent: "$125.75" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
            <p className="text-muted-foreground">Comprehensive business insights and performance metrics</p>
          </div>
          
          <div className="flex gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewStats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={cn(
                      "text-sm font-medium",
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    )}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">vs last period</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales by Plan */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Sales by Plan</h3>
            <div className="space-y-4">
              {salesByPlan.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.plan}</span>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{item.sales} sales</div>
                      <div className="text-xs text-muted-foreground">{item.revenue}</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Monthly Revenue Trend */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Revenue Trend</h3>
            <div className="space-y-4">
              {monthlyRevenue.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium">{item.month}</span>
                  <div className="text-right">
                    <div className="text-sm font-semibold">${item.revenue.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{item.orders} orders</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Top Customers */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-6">Top Customers</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold">Email</th>
                  <th className="text-left py-3 px-4 font-semibold">Orders</th>
                  <th className="text-left py-3 px-4 font-semibold">Total Spent</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((customer, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{customer.name}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{customer.email}</td>
                    <td className="py-3 px-4">{customer.orders}</td>
                    <td className="py-3 px-4 font-semibold">{customer.spent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Credit Card</span>
                <span className="font-semibold">68%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">PayPal</span>
                <span className="font-semibold">24%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Bank Transfer</span>
                <span className="font-semibold">8%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Order Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Completed</span>
                <span className="font-semibold text-green-600">1,456</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Processing</span>
                <span className="font-semibold text-blue-600">234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending</span>
                <span className="font-semibold text-yellow-600">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Failed</span>
                <span className="font-semibold text-red-600">68</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">United States</span>
                <span className="font-semibold">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Canada</span>
                <span className="font-semibold">18%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">United Kingdom</span>
                <span className="font-semibold">12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Australia</span>
                <span className="font-semibold">10%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Others</span>
                <span className="font-semibold">15%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;