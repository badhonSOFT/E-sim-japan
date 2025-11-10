import { useState, useEffect } from "react";
import { Search, Filter, Eye, Download, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import AdminNavbar from "@/components/AdminNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Order {
  id: string;
  customer: string;
  email: string;
  plan: string;
  data: string;
  validity: number;
  price: number;
  status: "Completed" | "Pending" | "Failed" | "Processing";
  date: string;
  paymentMethod: string;
}

const AdminOrders = () => {
  const [orders] = useState<Order[]>([
    { id: "ORD-001", customer: "John Doe", email: "john@example.com", plan: "10GB - 7 Days", data: "10GB", validity: 7, price: 6.48, status: "Completed", date: "2024-01-15", paymentMethod: "Credit Card" },
    { id: "ORD-002", customer: "Jane Smith", email: "jane@example.com", plan: "20GB - 15 Days", data: "20GB", validity: 15, price: 13.48, status: "Pending", date: "2024-01-14", paymentMethod: "PayPal" },
    { id: "ORD-003", customer: "Mike Johnson", email: "mike@example.com", plan: "5GB - 5 Days", data: "5GB", validity: 5, price: 3.28, status: "Completed", date: "2024-01-14", paymentMethod: "Credit Card" },
    { id: "ORD-004", customer: "Sarah Williams", email: "sarah@example.com", plan: "30GB - 30 Days", data: "30GB", validity: 30, price: 20.39, status: "Processing", date: "2024-01-13", paymentMethod: "Credit Card" },
    { id: "ORD-005", customer: "Tom Brown", email: "tom@example.com", plan: "1GB - 3 Days", data: "1GB", validity: 3, price: 1.54, status: "Failed", date: "2024-01-13", paymentMethod: "PayPal" }
  ]);

  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, dateFilter, orders]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700 hover:bg-green-200";
      case "Pending": return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200";
      case "Processing": return "bg-blue-100 text-blue-700 hover:bg-blue-200";
      case "Failed": return "bg-red-100 text-red-700 hover:bg-red-200";
      default: return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
  };

  const totalRevenue = filteredOrders.reduce((sum, order) => 
    order.status === "Completed" ? sum + order.price : sum, 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Order Management</h1>
          <p className="text-muted-foreground">Manage and track all eSIM orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-sm font-medium text-muted-foreground">Total Orders</h3>
            <p className="text-2xl font-bold mt-1">{filteredOrders.length}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-sm font-medium text-muted-foreground">Completed</h3>
            <p className="text-2xl font-bold mt-1 text-green-600">
              {filteredOrders.filter(o => o.status === "Completed").length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-sm font-medium text-muted-foreground">Pending</h3>
            <p className="text-2xl font-bold mt-1 text-yellow-600">
              {filteredOrders.filter(o => o.status === "Pending").length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-sm font-medium text-muted-foreground">Revenue</h3>
            <p className="text-2xl font-bold mt-1 text-blue-600">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-4 px-6 font-semibold">Order ID</th>
                  <th className="text-left py-4 px-6 font-semibold">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold">Plan</th>
                  <th className="text-left py-4 px-6 font-semibold">Price</th>
                  <th className="text-left py-4 px-6 font-semibold">Status</th>
                  <th className="text-left py-4 px-6 font-semibold">Date</th>
                  <th className="text-left py-4 px-6 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">{order.id}</td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-muted-foreground">{order.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium">{order.plan}</div>
                        <div className="text-sm text-muted-foreground">{order.paymentMethod}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold">${order.price.toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <Badge className={cn("text-xs", getStatusColor(order.status))}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">{order.date}</td>
                    <td className="py-4 px-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Download className="h-4 w-4" />
                            Download Receipt
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No orders found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;