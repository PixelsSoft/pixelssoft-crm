const MENU_ITEMS = [
  { key: "Apps", label: "Apps", isTitle: true, roles: ["SuperAdmin"], },
  {
    key: "dashboards",
    label: "Dashboards",
    isTitle: false,
    icon: "airplay",
    roles: ["SuperAdmin"],
    url: "/",
    badge: { variant: "success", text: "4" },
  },
  {
    key: "tracking",
    label: "Tracking",
    isTitle: false,
    icon: "airplay",
    roles: ["SuperAdmin"],
    url: "/",
    badge: { variant: "success", text: "4" },
    children: [
      {
        key: "my-team",
        label: "My team",
        url: "/apps/myteam",
        parentKey: "tracking",
        roles: ["SuperAdmin"]
      },
    ],
  },
  {
    key: "target",
    label: "Target",
    isTitle: false,
    roles: ["SuperAdmin", "Sale"],
    icon: "target",
    url: "/apps/target",
  },
  {
    key: "invoice",
    label: "Invoice",
    isTitle: false,
    roles: ["SuperAdmin", "Sales"],
    icon: "book",
    children: [
      {
        key: "invoices",
        label: "Invoices",
        url: "/apps/invoices",
        parentKey: "invoice",
        roles: ["SuperAdmin", "Sales"]
      },
      {
        key: "CreateInvoice",
        label: "Create Invoice",
        url: "/apps/invoice/createInvoice",
        parentKey: "invoice",
        roles: ["SuperAdmin", "Sales"]
      },
    ],
  },
  {
    key: "sales",
    label: "Sales",
    isTitle: false,
    roles: ["SuperAdmin"],
    icon: "dollar-sign",
    url: "/apps/sales",
  },
  {
    key: "commission",
    label: "Commissions",
    isTitle: false,
    roles: ["SuperAdmin", "Sales"],
    icon: "percent",
    url: "/apps/commission",
  },
  {
    key: "customers",
    label: "Customers",
    isTitle: false,
    icon: "users",
    roles: ["SuperAdmin", "Sales"],
    url: "/apps/customers",
  },
  {
    key: "biding",
    label: "Biding",
    isTitle: false,
    roles: ["SuperAdmin", "Sales"],
    icon: "briefcase",
    url: "/apps/biding",
  },
  {
    key: "leads",
    label: "Leads",
    isTitle: false,
    roles: ["SuperAdmin", "Sales", "Scraper"],
    icon: "database",
    url: "/apps/leads",
  },
  {
    key: "portalProject",
    label: "Portal Projects",
    isTitle: false,
    roles: ["SuperAdmin", "Sales"],
    icon: "cast",
    url: "/apps/portalProjects",
  },
  {
    key: "leadProject",
    label: "Lead Projects",
    isTitle: false,
    icon: "server",
    roles: ["SuperAdmin", "Sales"],
    url: "/apps/leadProjects",
  },
  {
    key: "ClientCard",
    label: "Client Card",
    isTitle: false,
    roles: ["SuperAdmin"],
    icon: "credit-card",
    url: "/apps/clientCard",
  },
  {
    key: "projects",
    label: "Projects",
    isTitle: false,
    roles: ["SuperAdmin", "Sales", "Developer"],
    icon: "trello",
    url: "/apps/projects/list",
  },
  {
    key: "hr",
    label: "HR",
    isTitle: false,
    roles: ["SuperAdmin", "Hr"],
    icon: "users",
    children: [
      {
        key: "employees",
        label: "Employees",
        url: "/apps/hr/employees",
        parentKey: "hr",
        roles: ["SuperAdmin", "Hr"]
      },
      {
        key: "addEmployee",
        label: "Add Employee",
        url: "/apps/hr/addEmployee",
        parentKey: "hr",
        roles: ["SuperAdmin", "Hr"]
      },
      {
        key: "attendance",
        label: "Attendance",
        url: "/apps/hr/attendance",
        parentKey: "hr",
        roles: ["SuperAdmin", "Hr"]
      },
      {
        key: "payout",
        label: "Payout",
        url: "/apps/hr/payout",
        parentKey: "hr",
        roles: ["SuperAdmin", "Hr"]
      },
      {
        key: "manageLeaves",
        label: "Manage Leaves",
        url: "/apps/hr/manageLeaves",
        parentKey: "hr",
        roles: ["SuperAdmin", "Hr"]
      },
    ],
  },
  {
    key: "report",
    label: "Report",
    isTitle: false,
    roles: ["SuperAdmin"],
    icon: "calendar",
    url: "/apps/report",
  },
  {
    key: "apps-chat",
    label: "Chat",
    roles: ["SuperAdmin", "Hr", "Sales", "Developer", "Scraper"],
    isTitle: false,
    icon: "message-square",
    url: "/apps/chat",
  },
  {
    key: "apps-email",
    label: "Email",
    isTitle: false,
    roles: ["SuperAdmin", "Hr", "Sales", "Developer", "Scraper"],
    icon: "mail",
    children: [
      {
        key: "email-inbox",
        label: "Inbox",
        url: "/apps/email/inbox",
        parentKey: "apps-email",
        roles: ["SuperAdmin", "Hr", "Sales", "Developer", "Scraper"]
      },
      {
        key: "email-read-email",
        label: "Read Email",
        url: "/apps/email/details",
        parentKey: "apps-email",
        roles: ["SuperAdmin", "Hr", "Sales", "Developer", "Scraper"]
      },
      {
        key: "email-compose-email",
        label: "Compose Email",
        url: "/apps/email/compose",
        parentKey: "apps-email",
        roles: ["SuperAdmin", "Hr", "Sales", "Developer", "Scraper"]
      },
    ],
  },
  {
    key: "administartor",
    label: "Administrator",
    isTitle: false,
    roles: ["SuperAdmin"],
    icon: "settings",
    children: [
      {
        key: "emailSetup",
        label: "Email Setup",
        url: "/apps/administartor/emailSetup",
        parentKey: "administartor",
        roles: ["SuperAdmin"]
      },
      {
        key: "rolePermission",
        label: "Role Permission",
        url: "/apps/administartor/rolePermission",
        parentKey: "administartor",
        roles: ["SuperAdmin"]
      },
      {
        key: "Management",
        label: "Management",
        url: "/apps/administartor/Management",
        parentKey: "administartor",
        roles: ["SuperAdmin"]
      },
    ],
  },
  {
    key: "account",
    label: "Account",
    isTitle: false,
    icon: "credit-card",
    roles: ["SuperAdmin"],
    children: [
      {
        key: "bankAccount",
        label: "Bank Account",
        url: "/apps/account/bankAccount",
        parentKey: "account",
        roles: ["SuperAdmin"]
      },
      {
        key: "expense",
        label: "Expense",
        url: "/apps/account/expense",
        parentKey: "account",
        roles: ["SuperAdmin"]
      },
      {
        key: "expenseCategory",
        label: "Expense Category",
        url: "/apps/account/expenseCategory",
        parentKey: "account",
        roles: ["SuperAdmin"]
      },
      {
        key: "vendorBills",
        label: "Vendor Payments",
        url: "/apps/account/vendorPayments",
        parentKey: "account",
        roles: ["SuperAdmin"]
      },
      {
        key: "vendor",
        label: "Vendor",
        url: "/apps/account/vendor",
        parentKey: "account",
        roles: ["SuperAdmin"]
      },
      {
        key: "vendorCategory",
        label: "Vendor Category",
        url: "/apps/account/VendorCategory",
        parentKey: "account",
        roles: ["SuperAdmin"]
      },
    ],
  },
  {
    key: "myAccount",
    label: "My Account",
    isTitle: false,
    roles: ["SuperAdmin", "Hr"],
    icon: "user",
    url: "/apps/myaccount",
  },
];

const HORIZONTAL_MENU_ITEMS = [
  {
    key: "dashboard",
    icon: "home",
    label: "Dashboard",
    isTitle: true,
    url: "/",
    roles: ["SuperAdmin"]
  },
  {
    key: "tracking",
    label: "Tracking",
    isTitle: false,
    icon: "airplay",
    url: "/",
    roles: ["SuperAdmin"],
    badge: { variant: "success", text: "4" },
    children: [
      {
        key: "my-team",
        label: "My team",
        url: "/apps/myteam",
        parentKey: "tracking",
        roles: ["SuperAdmin"]
      },
    ],
  },
  {
    key: "apps",
    icon: "grid",
    label: "Apps",
    isTitle: true,
    roles: ["SuperAdmin"],
    children: [
      {
        key: "target",
        label: "Target",
        icon: "target",
        url: "/apps/target",
        roles: ["SuperAdmin", "Sale"]
      },
      {
        key: "invoice",
        label: "Invoice",
        icon: "book",
        roles: ["SuperAdmin", "Sales"],
        children: [
          {
            key: "invoices",
            label: "Invoices",
            url: "/apps/invoices",
            parentKey: "invoice",
            roles: ["SuperAdmin", "Sales"]
          },
          {
            key: "CreateInvoice",
            label: "Create Invoice",
            url: "/apps/invoice/createInvoice",
            parentKey: "invoice",
            roles: ["SuperAdmin", "Sales"]
          },
        ],
      },
      {
        key: "sales",
        label: "Sales",
        icon: "dollar-sign",
        url: "/apps/sales",
        roles: ["SuperAdmin"]
      },
      {
        key: "commission",
        label: "Commissions",
        icon: "percent",
        url: "/apps/commission",
        roles: ["SuperAdmin", "Sales"]
      },
      {
        key: "customers",
        label: "Customers",
        icon: "users",
        url: "/apps/customers",
        roles: ["SuperAdmin", "Sales"]
      },
      {
        key: "biding",
        label: "Biding",
        icon: "briefcase",
        url: "/apps/biding",
        roles: ["SuperAdmin", "Sales"]
      },
      {
        key: "leads",
        label: "Leads",
        icon: "database",
        url: "/apps/leads",
        roles: ["SuperAdmin", "Sales", "Scraper"]
      },
      {
        key: "portalProject",
        label: "Portal Projects",
        icon: "cast",
        url: "/apps/portalProjects",
        roles: ["SuperAdmin", "Sales"]
      },
      {
        key: "leadProject",
        label: "Lead Projects",
        icon: "server",
        url: "/apps/leadProjects",
        roles: ["SuperAdmin", "Sales"]
      },
      {
        key: "ClientCard",
        label: "Client Card",
        icon: "credit-card",
        url: "/apps/clientCard",
        roles: ["SuperAdmin"]
      },
      {
        key: "projects",
        label: "Projects",
        icon: "trello",
        url: "/apps/projects/list",
        roles: ["SuperAdmin", "Sales", "Developer"]
      },
      {
        key: "hr",
        label: "HR",
        icon: "users",
        roles: ["SuperAdmin", "Hr"],
        children: [
          {
            key: "employees",
            label: "Employees",
            url: "/apps/hr/employees",
            parentKey: "hr",
            roles: ["SuperAdmin", "Hr"]
          },
          {
            key: "addEmployee",
            label: "Add Employee",
            url: "/apps/hr/addEmployee",
            parentKey: "hr",
            roles: ["SuperAdmin", "Hr"]
          },
          {
            key: "attendance",
            label: "Attendance",
            url: "/apps/hr/attendance",
            parentKey: "hr",
            roles: ["SuperAdmin", "Hr"]
          },
          {
            key: "payout",
            label: "Payout",
            url: "/apps/hr/payout",
            parentKey: "hr",
            roles: ["SuperAdmin", "Hr"]
          },
          {
            key: "manageLeaves",
            label: "Manage Leaves",
            url: "/apps/hr/manageLeaves",
            parentKey: "hr",
            roles: ["SuperAdmin", "Hr"]
          },
        ],
      },
      {
        key: "report",
        label: "Report",
        icon: "calendar",
        url: "/apps/report",
        roles: ["SuperAdmin"]
      },
      {
        key: "chat",
        label: "Chat",
        icon: "message-square",
        url: "/apps/chat",
        roles: ["SuperAdmin", "Hr", "Sales", "Developer", "Scraper"]
      },
      {
        key: "email",
        label: "Email",
        icon: "mail",
        roles: ["SuperAdmin", "Hr", "Sales", "Developer", "Scraper"],
        children: [
          {
            key: "email-inbox",
            label: "Inbox",
            url: "/apps/email/inbox",
            parentKey: "email",
            roles: ["SuperAdmin", "Hr", "Sales", "Developer", "Scraper"]
          },
          {
            key: "email-read-email",
            label: "Read Email",
            url: "/apps/email/details",
            parentKey: "email",
            roles: ["SuperAdmin", "Hr", "Sales", "Developer", "Scraper"]
          },
          {
            key: "email-compose-email",
            label: "Compose Email",
            url: "/apps/email/compose",
            parentKey: "email",
            roles: ["SuperAdmin", "Hr", "Sales", "Developer", "Scraper"]
          },
        ],
      },
      {
        key: "administrator",
        label: "Administrator",
        icon: "settings",
        roles: ["SuperAdmin"],
        children: [
          {
            key: "role-permission",
            label: "Role Permission",
            url: "/apps/administartor/rolePermission",
            parentKey: "administrator",
            roles: ["SuperAdmin"]
          },
          {
            key: "emailSetup",
            label: "Email Setup",
            url: "/apps/administartor/emailSetup",
            parentKey: "administrator",
            roles: ["SuperAdmin"]
          },
        ],
      },
      {
        key: "account",
        label: "Account",
        icon: "credit-card",
        roles: ["SuperAdmin"],
        children: [
          {
            key: "bankAccount",
            label: "Bank Account",
            url: "/apps/account/bankAccount",
            parentKey: "account",
            roles: ["SuperAdmin"]
          },
          {
            key: "expense",
            label: "Expense",
            url: "/apps/account/expense",
            parentKey: "account",
            roles: ["SuperAdmin"]
          },
        ],
      },
      {
        key: "myAccount",
        label: "My Account",
        icon: "user",
        url: "/apps/myaccount",
        roles: ["SuperAdmin", "Hr"]
      },
    ],
  },
];


const TWO_COl_MENU_ITEMS = [
  {
    key: "dashboard",
    icon: "home",
    label: "Dashboard",
    isTitle: true,
    url: "/",
    roles: ["SuperAdmin"]
  },
  {
    key: "tracking",
    label: "Tracking",
    isTitle: false,
    icon: "airplay",
    roles: ["SuperAdmin"],
    children: [
      {
        key: "my-team",
        label: "My team",
        url: "/apps/myteam",
        parentKey: "tracking",
        roles: ["SuperAdmin"]
      },
    ],
  },
  {
    key: "apps",
    icon: "grid",
    label: "Apps",
    isTitle: true,
    roles: ["SuperAdmin"],
    children: [
      {
        key: "target",
        label: "Target",
        icon: "target",
        url: "/apps/target",
        parentKey: "apps",
        roles: ["SuperAdmin", "Sale"]
      },
      {
        key: "invoice",
        label: "Invoice",
        icon: "book",
        parentKey: "apps",
        roles: ["SuperAdmin", "Sales"],
        children: [
          {
            key: "invoices",
            label: "Invoices",
            url: "/apps/invoices",
            parentKey: "invoice",
            roles: ["SuperAdmin", "Sales"]
          },
          {
            key: "CreateInvoice",
            label: "Create Invoice",
            url: "/apps/invoice/createInvoice",
            parentKey: "invoice",
            roles: ["SuperAdmin", "Sales"]
          },
        ],
      },
      {
        key: "sales",
        label: "Sales",
        icon: "dollar-sign",
        url: "/apps/sales",
        parentKey: "apps",
        roles: ["SuperAdmin"]
      },
      {
        key: "commission",
        label: "Commissions",
        icon: "percent",
        url: "/apps/commission",
        parentKey: "apps",
        roles: ["SuperAdmin", "Sales"]
      },
      {
        key: "customers",
        label: "Customers",
        icon: "users",
        url: "/apps/customers",
        parentKey: "apps",
        roles: ["SuperAdmin", "Sales"]
      },
      {
        key: "biding",
        label: "Biding",
        icon: "briefcase",
        url: "/apps/biding",
        parentKey: "apps",
        roles: ["SuperAdmin", "Sales"]
      },
      {
        key: "leads",
        label: "Leads",
        icon: "database",
        url: "/apps/leads",
        parentKey: "apps",
        roles: ["SuperAdmin", "Sales", "Scraper"]
      },
      {
        key: "portalProject",
        label: "Portal Projects",
        icon: "cast",
        url: "/apps/portalProjects",
        parentKey: "apps",
        roles: ["SuperAdmin", "Sales"]
      },
      {
        key: "projects",
        label: "Projects",
        icon: "trello",
        url: "/apps/projects/list",
        parentKey: "apps",
        roles: ["SuperAdmin", "Sales", "Developer"]
      },
      {
        key: "hr",
        label: "HR",
        icon: "users",
        parentKey: "apps",
        roles: ["SuperAdmin", "Hr"],
        children: [
          {
            key: "employees",
            label: "Employees",
            url: "/apps/hr/employees",
            parentKey: "hr",
            roles: ["SuperAdmin", "Hr"]
          },
          {
            key: "addEmployee",
            label: "Add Employee",
            url: "/apps/hr/addEmployee",
            parentKey: "hr",
            roles: ["SuperAdmin", "Hr"]
          },
          {
            key: "attendance",
            label: "Attendance",
            url: "/apps/hr/attendance",
            parentKey: "hr",
            roles: ["SuperAdmin", "Hr"]
          },
          {
            key: "payout",
            label: "Payout",
            url: "/apps/hr/payout",
            parentKey: "hr",
            roles: ["SuperAdmin", "Hr"]
          },
          {
            key: "manageLeaves",
            label: "Manage Leaves",
            url: "/apps/hr/manageLeaves",
            parentKey: "hr",
            roles: ["SuperAdmin", "Hr"]
          },
        ],
      },
      {
        key: "report",
        label: "Report",
        icon: "calendar",
        url: "/apps/report",
        parentKey: "apps",
        roles: ["SuperAdmin"]
      },
      {
        key: "apps-chat",
        label: "Chat",
        icon: "message-square",
        url: "/apps/chat",
        parentKey: "apps",
        roles: ["SuperAdmin", "Hr", "Sales", "Developer", "Scraper"]
      },
      {
        key: "apps-email",
        label: "Email",
        icon: "mail",
        parentKey: "apps",
        roles: ["SuperAdmin", "Hr", "Sales", "Developer", "Scraper"],
        children: [
          {
            key: "email-inbox",
            label: "Inbox",
            url: "/apps/email/inbox",
            parentKey: "apps-email",
            roles: ["SuperAdmin", "Hr", "Sales", "Developer", "Scraper"]
          },
          {
            key: "email-read-email",
            label: "Read Email",
            url: "/apps/email/details",
            parentKey: "apps-email",
            roles: ["SuperAdmin", "Hr", "Sales", "Developer", "Scraper"]
          },
          {
            key: "email-compose-email",
            label: "Compose Email",
            url: "/apps/email/compose",
            parentKey: "apps-email",
            roles: ["SuperAdmin", "Hr", "Sales", "Developer", "Scraper"]
          },
        ],
      },
      {
        key: "administrator",
        label: "Administrator",
        icon: "settings",
        parentKey: "apps",
        roles: ["SuperAdmin"],
        children: [
          {
            key: "role-permission",
            label: "Role Permission",
            url: "/apps/administrator/rolePermission",
            parentKey: "administrator",
            roles: ["SuperAdmin"]
          },
          {
            key: "emailSetup",
            label: "Email Setup",
            url: "/apps/administrator/emailSetup",
            parentKey: "administrator",
            roles: ["SuperAdmin"]
          },
        ],
      },
      {
        key: "account",
        label: "Account",
        icon: "credit-card",
        parentKey: "apps",
        roles: ["SuperAdmin"],
        children: [
          {
            key: "bankAccount",
            label: "Bank Account",
            url: "/apps/account/bankAccount",
            parentKey: "account",
            roles: ["SuperAdmin"]
          },
          {
            key: "expense",
            label: "Expense",
            url: "/apps/account/expense",
            parentKey: "account",
            roles: ["SuperAdmin"]
          },
        ],
      },
      {
        key: "myAccount",
        label: "My Account",
        icon: "user",
        url: "/apps/myaccount",
        parentKey: "apps",
        roles: ["SuperAdmin", "Hr"]
      },
    ],
  },
];
export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };