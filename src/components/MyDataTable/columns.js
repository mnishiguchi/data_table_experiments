import { Filters } from "react-data-grid-addons";

const { NumericFilter, AutoCompleteFilter } = Filters;

// columns config
export default [
  {
    key: "management_name",
    name: "Client Company",
    filterable: true,
    sortable: true,
    resizable: true,
    draggable: true,
    filter_renderer: AutoCompleteFilter,
    width: 160
  },
  {
    key: "property_name",
    name: "Property Name",
    filterable: true,
    sortable: true,
    resizable: true,
    draggable: true,
    filter_renderer: AutoCompleteFilter,
    width: 160
  },
  {
    key: "zip",
    name: "Zip",
    filterable: true,
    sortable: true,
    resizable: true,
    draggable: false,
    filter_renderer: AutoCompleteFilter,
    width: 160
  },
  {
    key: "package_level",
    name: "Package Level",
    filterable: true,
    sortable: true,
    resizable: true,
    draggable: true,
    filter_renderer: NumericFilter,
    width: 160
  },
  {
    key: "total_property_activities",
    name: "Total Property Activities",
    filterable: true,
    sortable: true,
    resizable: true,
    draggable: false,
    filter_renderer: NumericFilter,
    width: 160
  },
  {
    key: "featured_property",
    name: "Featured Property",
    filterable: true,
    sortable: true,
    resizable: true,
    draggable: false,
    filter_renderer: NumericFilter,
    width: 160
  },
  {
    key: "video_views",
    name: "Video Views",
    filterable: true,
    sortable: true,
    resizable: true,
    draggable: false,
    filter_renderer: NumericFilter,
    width: 160
  },
  {
    key: "photo_stats",
    name: "Photo Stats",
    filterable: true,
    sortable: true,
    resizable: true,
    draggable: false,
    filter_renderer: NumericFilter,
    width: 160
  },
  {
    key: "additional_leads",
    name: "Additional Leads",
    filterable: true,
    sortable: true,
    resizable: true,
    draggable: false,
    filter_renderer: NumericFilter,
    width: 160
  },
  {
    key: "email_contacts",
    name: "Email Contacts",
    filterable: true,
    sortable: true,
    resizable: true,
    draggable: false,
    filter_renderer: NumericFilter,
    width: 160
  },
  {
    key: "call_tracking",
    name: "Call Tracking",
    filterable: true,
    sortable: true,
    resizable: true,
    draggable: false,
    filter_renderer: NumericFilter,
    width: 160
  },
  {
    key: "legacy_property_click_thrus",
    name: "Legacy Property Click Thrus",
    filterable: true,
    sortable: true,
    resizable: true,
    draggable: false,
    filter_renderer: NumericFilter,
    width: 160
  },
  {
    key: "legacy_management_click_thrus",
    name: "Legacy Management Click Thrus",
    filterable: true,
    sortable: true,
    resizable: true,
    draggable: false,
    filter_renderer: NumericFilter,
    width: 160
  },
  {
    key: "total_leads",
    name: "Total Leads",
    filterable: true,
    sortable: true,
    resizable: true,
    draggable: false,
    filter_renderer: NumericFilter,
    width: 160
  }
];
