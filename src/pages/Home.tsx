import { useState } from "react"
import { Table, Button, Modal, Form, Input, InputNumber, message } from "antd"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getPackages, createPackage, updatePackage, deletePackage } from "../api/package"
import type { Package, PackageItem } from "../types/package"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { FileExcelOutlined, FilePdfOutlined, PlusOutlined } from "@ant-design/icons"

const Home = () => {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingPackage, setEditingPackage] = useState<PackageItem | null>(null)
  const queryClient = useQueryClient()

  const { data: packages, isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: getPackages,
  })

  const createMutation = useMutation({
    mutationFn: createPackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] })
      message.success("Package created successfully")
      setIsModalVisible(false)
      form.resetFields()
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<Package, "id"> }) =>
      updatePackage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] })
      message.success("Package updated successfully")
      setIsModalVisible(false)
      setEditingPackage(null)
      form.resetFields()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deletePackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] })
      message.success("Package deleted successfully")
    },
  })

  const handleSubmit = (values: Omit<Package, "id">) => {
    if (editingPackage) {
      updateMutation.mutate({ id: editingPackage?.id_banner_ads_package as unknown as number, data: values })
    } else {
      createMutation.mutate(values)
    }
  }

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(packages?.data || [])
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Packages")
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" })
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })
    saveAs(data, "packages.xlsx")
  }

  const exportToPDF = () => {
    if (!packages?.data.length) {
      message.warning("No data to export")
      return
    }

    try {
      const doc = new jsPDF()

      doc.setFontSize(16)
      doc.text("Package List Report", 14, 15)

      doc.setFontSize(10)
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 25)

      const tableData = packages?.data.map((pkg) => [
        pkg.package_name,
        pkg.package_description,
        `$${pkg.package_price}`,
        `${pkg.package_duration} days`,
      ])

      autoTable(doc, {
        head: [["Name", "Description", "Price", "Duration"]],
        body: tableData,
        startY: 30,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [41, 128, 185] },
      })

      doc.save("packages-report.pdf")
      message.success("PDF generated successfully")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error("Failed to generate PDF")
    }
  }

  const columns = [
    {
      title: "Package Name",
      dataIndex: "package_name",
      key: "package_name",
    },
    {
      title: "Description",
      dataIndex: "package_description",
      key: "package_description",
    },
    {
      title: "Price",
      dataIndex: "package_price",
      key: "package_price",
    },
    {
      title: "Duration",
      dataIndex: "package_duration",
      key: "package_duration",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: PackageItem) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setEditingPackage(record)
              form.setFieldsValue(record)
              setIsModalVisible(true)
            }}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => deleteMutation.mutate(record.id_banner_ads_package)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingPackage(null)
            form.resetFields()
            setIsModalVisible(true)
          }}
          style={{ marginRight: 8 }}
        >
          Add Package
        </Button>
        <Button
          icon={<FileExcelOutlined />}
          onClick={exportToExcel}
          style={{ marginRight: 8 }}
        >
          Export to Excel
        </Button>
        <Button
          icon={<FilePdfOutlined />}
          onClick={exportToPDF}
        >
          Export to PDF
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={packages?.data || []}
        loading={isLoading}
        rowKey="id"
      />

      <Modal
        title={editingPackage ? "Edit Package" : "Add Package"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          setEditingPackage(null)
          form.resetFields()
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="package_name"
            label="Package Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="package_description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="package_price"
            label="Price"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="package_duration"
            label="Duration"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={createMutation.isPending || updateMutation.isPending}
            >
              {editingPackage ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Home
