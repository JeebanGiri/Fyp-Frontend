import { formatDate } from "../../../utils/formatDate";
import styles from "./CustomerReport.module.css";
import { FaHotel } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { Button } from "antd";
import { useLocation } from "react-router-dom";
import { generateCustomerReport } from "../../../constants/Api";
import { useQuery } from "react-query";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CustomerReport = () => {
  const location = useLocation();
  const { datas } = location.state || {};
  const currentDate = Date.now();
  const formattedDate = formatDate(currentDate);
  const token = localStorage.getItem("token");

  // Extract the necessary data from the state
  const bookId = datas?.book_id;
  const userId = datas?.user_id;
  const checkInDate = datas?.check_In_Date;

  const { data: generatedReportInfo } = useQuery("generated-report", () =>
    generateCustomerReport(token, bookId, userId, checkInDate)
  );

  const reportInfo = generatedReportInfo?.data;

  const cName = reportInfo?.full_name;

  // Function to generate the PDF
  const handleDownload = async () => {
    try {
      const input = document.getElementById("report-content");
      const canvas = await html2canvas(input, {
        scale: 2, // Increase the scale for better quality
        useCORS: true, // Ensure cross-origin images are loaded properly
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth - 20; // Apply padding to left and right (10mm each)
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      const xOffset = 10; // 10mm padding on the left
      const yOffset = 50; // 50px from the top

      pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);
      pdf.save(`${cName}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <div className={styles.reportContainer}>
        <div className={styles["dwn-btn"]}>
          <Button type="primary" onClick={handleDownload}>
            Download
          </Button>
        </div>
        {reportInfo
          ? reportInfo && (
              <div id="report-content" className={styles.reportpage}>
                <div className={styles.header}>
                  <span>
                    <h5>
                      <span>
                        <FaHotel />
                      </span>
                      <span>{reportInfo.hotel.name}</span>
                    </h5>
                    <p>
                      <span>
                        <CiLocationOn />
                      </span>
                      <span>{reportInfo.hotel.address}</span>
                    </p>
                  </span>
                </div>
                <div className={styles["report-titles"]}>
                  <span>
                    <p>Customer Report</p>
                    <p>Reserve By: {reportInfo.full_name}</p>
                  </span>
                  <span>
                    <p>Invoice No: </p>
                    <p>Date: {formattedDate}</p>
                  </span>
                </div>
                <div className={styles["report-body"]}>
                  <div className={styles.col}>
                    <h6>Customer Name</h6>
                    <p>{reportInfo.full_name}</p>
                  </div>
                  <div className={styles.col}>
                    <h6>Customer Contact</h6>
                    <p>{reportInfo.phone_number}</p>
                  </div>
                  <div className={styles.col}>
                    <h6>Room Quantity</h6>
                    <p>{reportInfo.room_quantity}</p>
                  </div>
                  <div className={styles.col}>
                    <h6>Room Rate</h6>
                    <p>Rs. {reportInfo.total_amount}</p>
                  </div>
                  <div className={styles.col}>
                    <h6>Total Amount</h6>
                    <p>Rs. {reportInfo.total_amount}</p>
                    <p className={styles.gtotal}>Grand Total</p>
                    <hr />
                    <p>Rs. {reportInfo.total_amount}</p>
                  </div>
                </div>
              </div>
            )
          : null}
      </div>
    </>
  );
};

export default CustomerReport;
