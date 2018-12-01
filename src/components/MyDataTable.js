import React from "react";
import ReactDataGrid from "react-data-grid";
import { Draggable, Data, ToolsPanel } from "react-data-grid-addons";
import { CSVLink } from "react-csv";
import moment from "moment";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import columns from "./MyDataTable/columns"; // config file
import rows from "../data/ps_20181201095235"; // dev use only

// for csv headers
const column_keys = columns.map(({ key }) => key);

class MyDataTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: columns,
      rows: rows, // fetch from api
      filters: {},
      groupBy: [],
      expandedRows: {},
      sortColumn: "created_at",
      sortDirection: "ASC",
      dates: {
        focusedInput: null,
        startDate: props.startDate
          ? moment(props.startDate)
          : moment().subtract(7, "d"),
        endDate: props.endDate ? moment(props.endDate) : moment()
      }
    };
  }

  currentRows = () => Data.Selectors.getRows({ ...this.state });

  // configure generate a filename that reflects the content
  csvFilename = () => {
    return [
      "statistic",
      "_",
      moment(this.state.dates.startDate).format("YYYYMMDD"),
      "_",
      moment(this.state.dates.endDate).format("YYYYMMDD"),
      ".csv"
    ].join("");
  };

  // convert all rows to react-csv compatible format
  csvData = () =>
    this.state.rows.map(row => column_keys.map(colName => row[colName]));

  onRowExpandToggle = ({ columnGroupName, name, shouldExpand }) =>
    this.setState({
      expandedRows: {
        ...this.state.expandedRows,
        [columnGroupName]: {
          ...this.state.expandedRows[columnGroupName],
          [name]: { isExpanded: shouldExpand }
        }
      }
    });

  onGridSort = (sortColumn, sortDirection) =>
    this.setState({ sortColumn, sortDirection });

  onAddFilter = filter => {
    if (filter.filterTerm) {
      this.setState({
        filters: {
          ...this.state.filters,
          [filter.column.key]: filter
        }
      });
    } else {
      const {
        [filter.column.key]: deletedFilter,
        ...rest
      } = this.state.filters;
      this.setState({ filters: rest });
    }
  };

  onClearFilters = () => this.setState({ filters: {} });

  onColumnGroupAdded = columnKey =>
    this.setState({ groupBy: [...this.state.groupBy, columnKey] });

  onColumnGroupDeleted = columnKey =>
    this.setState({
      groupBy: this.state.groupBy.filter(g => g !== columnKey)
    });

  getValidFilterValues = columnId => this.state.rows.map(row => row[columnId]);

  onDatesChange = ({ startDate, endDate }) =>
    this.setState({
      dates: {
        ...this.state.dates,
        startDate,
        endDate
      }
    });

  onFocusChange = focusedInput =>
    this.setState({
      dates: {
        ...this.state.dates,
        focusedInput
      }
    });

  render() {
    // keep currentRows here for once-per-render calculation
    const currentRows = this.currentRows();

    const dateRangePickerOptions = {
      required: true,
      onDatesChange: this.onDatesChange,
      onFocusChange: this.onFocusChange,
      focusedInput: this.state.dates.focusedInput,
      startDateId: "startDateId",
      endDateId: "endDateId",
      startDate: this.state.dates.startDate,
      endDate: this.state.dates.endDate,
      isOutsideRange: () => false,
      orientation: "horizontal"
    };

    const reactDataGridOptions = {
      columns: columns,
      getValidFilterValues: this.getValidFilterValues,
      minHeight: window.visualViewport.height - 200,
      onAddFilter: this.onAddFilter,
      onClearFilters: this.onClearFilters,
      onGridSort: this.onGridSort,
      onRowExpandToggle: this.onRowExpandToggle,
      rowGetter: index => currentRows[index],
      rowHeight: 40,
      rowsCount: currentRows.length,
      enableCellAutoFocus: false
    };

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <DateRangePicker {...dateRangePickerOptions} />
          <CSVLink
            headers={column_keys}
            data={this.csvData()}
            filename={this.csvFilename()}
            target="_blank"
          >
            Download as CSV
          </CSVLink>
        </div>
        <Draggable.Container>
          <ReactDataGrid
            {...reactDataGridOptions}
            toolbar={({ onToggleFilter }) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <ToolsPanel.AdvancedToolbar>
                  <ToolsPanel.GroupedColumnsPanel
                    groupBy={this.state.groupBy}
                    onColumnGroupAdded={this.onColumnGroupAdded}
                    onColumnGroupDeleted={this.onColumnGroupDeleted}
                  />
                </ToolsPanel.AdvancedToolbar>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={onToggleFilter}
                >
                  Filter Rows
                </button>
              </div>
            )}
          />
        </Draggable.Container>
      </div>
    );
  }
}

export default MyDataTable;
