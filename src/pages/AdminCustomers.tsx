import { useState, useEffect } from "react";
import { Search, Filter, Eye, Mail, MoreHorizontal, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import AdminNavbar from "@/components/AdminNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  status: "Active" | "Inactive" | "Blocked";
  joinedDate: string;
  country: string;
}

const AdminCustomers = () => {
  const [customers] = useState<Customer[]>([
    { id: "CUST-001", name: "John Doe", email: "john@example.com", phone: "+1-555-0123", orders: 3, totalSpent: 45.20, lastOrder: "2024-01-15", status: "Active", joinedDate: "2023-12-01", country: "USA" },
    { id: "CUST-002", name: "Jane Smith", email: "jane@example.com", phone: "+1-555-0124", orders: 1, totalSpent: 13.48, lastOrder: "2024-01-14", status: "Active", joinedDate: "2024-01-10", country: "Canada" },
    { id: "CUST-003", name: "Mike Johnson", email: "mike@example.com", orders: 5, totalSpent: 78.90, lastOrder: "2024-01-12", status: "Active", joinedDate: "2023-11-15", country: "UK" },
    { id: "CUST-004", name: "Sarah Williams", email: "sarah@example.com", phone: "+1-555-0126", orders: 2, totalSpent: 33.87, lastOrder: "2024-01-10", status: "Active", joinedDate: "2024-01-05", country: "Australia" },
    { id: "CUST-005", name: "Tom Brown", email: "tom@example.com", orders: 0, totalSpent: 0, lastOrder: "Never", status: "Inactive", joinedDate: "2024-01-08", country: "USA" },
    { id: "CUST-006", name: "Lisa Chen", email: "lisa@example.com", phone: "+1-555-0127", orders: 7, totalSpent: 156.34, lastOrder: "2024-01-16", status: "Active", joinedDate: "2023-10-20", country: "Singapore" }
  ]);

  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(customers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    let filtered = customers;

    if (searchTerm) {
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter(customer => customer.status === statusFilter);
    }

    // Sort customers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "orders":
          return b.orders - a.orders;
        case "spent":
          return b.totalSpent - a.totalSpent;
        case "joined":
          return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
        default:
          return 0;
      }
    });

    setFilteredCustomers(filtered);
  }, [searchTerm, statusFilter, sortBy, customers]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700 hover:bg-green-200";
      case "Inactive": return "bg-gray-100 text-gray-700 hover:bg-gray-200";
      case "Blocked": return "bg-red-100 text-red-700 hover:bg-red-200";
      default: return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
  };

  const totalCustomers = filteredCustomers.length;
  const activeCustomers = filteredCustomers.filter(c => c.status === "Active").length;
  const totalRevenue = filteredCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const avgOrderValue = totalRevenue / filteredCustomers.reduce((sum, customer) => sum + customer.orders, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Customer Management</h1>
          <p className="text-muted-foreground">Manage and track all customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-sm font-medium text-muted-foreground">Total Customers</h3>
            <p className="text-2xl font-bold mt-1">{totalCustomers}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-sm font-medium text-muted-foreground">Active Customers</h3>
            <p className="text-2xl font-bold mt-1 text-green-600">{activeCustomers}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
            <p className="text-2xl font-bold mt-1 text-blue-600">${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-sm font-medium text-muted-foreground">Avg Order Value</h3>
            <p className="text-2xl font-bold mt-1 text-purple-600">${avgOrderValue.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search customers..."
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
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Sort by Name</SelectItem>
                    <SelectItem value="orders">Sort by Orders</SelectItem>
                    <SelectItem value="spent">Sort by Spent</SelectItem>
                    <SelectItem value="joined">Sort by Joined</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Add Customer
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-4 px-6 font-semibold">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold">Contact</th>
                  <th className="text-left py-4 px-6 font-semibold">Orders</th>
                  <th className="text-left py-4 px-6 font-semibold">Total Spent</th>
                  <th className="text-left py-4 px-6 font-semibold">Last Order</th>
                  <th className="text-left py-4 px-6 font-semibold">Status</th>
                  <th className="text-left py-4 px-6 font-semibold">Joined</th>
                  <th className="text-left py-4 px-6 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.id}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-sm">{customer.email}</div>
                        {customer.phone && (
                          <div className="text-sm text-muted-foreground">{customer.phone}</div>
                        )}
                        <div className="text-xs text-muted-foreground">{customer.country}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold">{customer.orders}</td>
                    <td className="py-4 px-6 font-semibold">${customer.totalSpent.toFixed(2)}</td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">{customer.lastOrder}</td>
                    <td className="py-4 px-6">
                      <Badge className={cn("text-xs", getStatusColor(customer.status))}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">{customer.joinedDate}</td>
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
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Mail className="h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No customers found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;