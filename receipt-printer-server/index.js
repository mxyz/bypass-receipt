const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const escpos = require("escpos");
escpos.USB = require("escpos-usb");

// const ip = "192.168.241.77";
const ip = "192.168.1.179";

// const printReceipt = (
//   customerName,
//   checkoutItems,
//   totalCups,
//   subTotal,
//   discount,
//   totalPrice
// ) => {
const printReceipt = () => {
  const device = new escpos.USB();
  const options = { encoding: "TIS-620", width: 80 };
  const printer = new escpos.Printer(device, options);
  // Path to png image
  const filePath = path.join(__dirname, "../assets/viet-cuisine-logo.webp");

  escpos.Image.load(filePath, (image) => {
    device.open(async function (err) {
      if (err) {
        throw err;
      }

      // const receiptDateTime = new Date();
      const receiptDateTime = new Date(2023, 11, 25, 9, 30, 0);
      const thankYouText =
        "Thank you for your purchase.\n\nFollow us on Instagram:\nthe.purist.artisan";

      const print = async () => {
        // Main section
        await printer
          .font("a")
          .style("bu")
          .align("CT")
          .image(image, "D24") // specific to our logo
          .then(() => {
            printer
              .text("Receipt")
              .drawLine("-")
              // Customer info
              .text(`Customer: ${customerName}`)
              .text(
                `${receiptDateTime.toLocaleDateString()} ${receiptDateTime.toLocaleTimeString()}`
              )
              .drawLine("-");
          });

        checkoutItems.forEach((item) => {
          printer.tableCustom([
            { align: "LEFT", width: 0.1, text: "test" },
            { align: "LEFT", width: 0.5, text: "test2" },
            { align: "RIGHT", width: 0.3, text: "400.00" },
          ]);
        });

        // Summary section
        printer
          .drawLine("-")
          .align("LT")
          .text(`Total cup: ${1}`)
          .align("RT");

        if (discount === undefined || parseFloat(discount) !== 0) {
          printer
            .tableCustom([
              { align: "LEFT", width: 0.3, text: "SubTotal:" },
              { align: "RIGHT", width: 0.2, text: "400.00" },
            ])
            .tableCustom([
              { align: "LEFT", width: 0.3, text: "Discount:" },
              { align: "RIGHT", width: 0.2, text: "0.00" },
            ]);
        }
        printer
          .text("-------------------")
          .tableCustom([
            { align: "LEFT", width: 0.4, text: "Total Price:" },
            { align: "RIGHT", width: 0.2, text: "400.00" },
          ])
          .text("-------------------");

        printer.feed(1).align("CT").text("เทสเทสเทส").feed(2);
        printer.feed(1).align("CT").text(thankYouText).feed(2).close();
      };

      print();
    });
  });
};

const app = express();
const corsOptions = {
  origin: "*",
  credentials: false,
};
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.post("/print", async (req, res) => {
  console.log('called');
  try {
    // const {} = req.body;
    console.log("try")
    printReceipt();
    // Send success response
    res.status(200).json({ message: "Receipt printed successfully" });
  } catch (error) {
    console.error("Error printing receipt:", error);
    res
      .status(500)
      .json({ error: "An error occurred while printing the receipt" });
  }
});

app.listen(3001, () => console.log("Server listening on port 3001"));

// testBluetooth();
