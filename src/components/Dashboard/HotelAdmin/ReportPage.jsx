import styles from "./ReportPage.module.css";
import Select from "react-select";
import { useState } from "react";
import { Button, Divider, Radio, Table } from "antd";
import { getAllReservation } from "../../../constants/Api";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
const ReportPage = () => {
  const [selectionType, setSelectionType] = useState("radio");
  const [selectedReservations, setSelectedReservations] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const navigateTo = useNavigate();

  const [datas, setDatas] = useState({
    book_id: "",
    user_id: "",
    check_In_Date: "",
  });

  const handleChange = (selectedRows) => {
    if (selectedRows.length > 0) {
      const selectedRow = selectedRows[0];
      setDatas({
        book_id: selectedRow.id,
        user_id: selectedRow.user_id,
        check_In_Date: selectedRow.check_In_Date,
      });
      setIsButtonVisible(true); // Show the button when a row is selected
    } else {
      setIsButtonVisible(false); // Hide the button when no row is selected
    }
  };

  const handleGenerateReport = async () => {
    try {
      // const cusInfo = await generateCustomerReport(token, datas);
      // console.log(cusInfo);

      navigateTo("/hoteladmin-dashboard/generate-report", {
        state: { datas },
      });
    } catch (error) {
      console.error("Failed to generate report:", error);
    }
  };

  const token = localStorage.getItem("token");
  const { data } = useQuery("reservation", () => getAllReservation(token));
  const bookInfo = data?.data.result;

  const options = [
    { value: "Last 30  days", label: "Last 30 Days" },
    { value: "Last 6 Months", label: "Last 6 Months" },
    { value: "Last 1 Year", label: "Last 1 Year" },
  ];
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "full_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "Check In Date",
      dataIndex: "check_In_Date",
    },
    {
      title: "Check Out Date",
      dataIndex: "check_Out_Date",
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedReservations(selectedRows);
      handleChange(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
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
            dataSource={bookInfo}
            rowKey={"id"}
          />
        </div>
      </div>
      {isButtonVisible && (
        <div className={styles["generate-report-button"]}>
          <Button type="primary" onClick={handleGenerateReport}>
            Generate Report
          </Button>
        </div>
      )}
    </>
  );
};
export default ReportPage;
