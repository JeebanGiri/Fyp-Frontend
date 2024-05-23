import styles from "./ReportPage.module.css";
import Select from "react-select";
import { useState } from "react";
import { Divider, Radio, Table } from "antd";
const ReportPage = () => {
  const options = [
    { value: "Last 30  days", label: "Last 30 Days" },
    { value: "Last 6 Months", label: "Last 6 Months" },
    { value: "Last 1 Year", label: "Last 1 Year" },
  ];
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Hotel Name",
      dataIndex: "hotel-name",
    },
    {
      title: "Check-In Date",
      dataIndex: "check-in",
    },
    {
      title: "Check-Out Date",
      dataIndex: "check-out",
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Disabled User",
      age: 99,
      address: "Sydney No. 1 Lake Park",
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const [selectionType, setSelectionType] = useState("radio");
  return (
    <>
      <div className={styles["report-page"]}>
        <div className={styles["report-titles"]}>
          <span>
            <h5>Generate Report</h5>
          </span>
          <span className={styles.selection}>
            <Select options={options} className={styles.select} />
          </span>
        </div>

        {/* <Radio.Group
          onChange={({ target: { value } }) => {
            setSelectionType(value);
          }}
          value={selectionType}
        >
          <Radio value="checkbox">Checkbox</Radio>
          <Radio value="radio">radio</Radio>
        </Radio.Group> */}

        <div className={styles["report-table"]}>
          <Divider />
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
          />
        </div>
      </div>
    </>
  );
};
export default ReportPage;
