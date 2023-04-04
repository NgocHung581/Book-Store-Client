import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import bookApiURL from "api/bookApiURL";
import categoryApiURL from "api/categoryApiURL";
import { useAxiosClient } from "hooks";

function FormCreateBook() {
    const axiosClient = useAxiosClient();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
        author: "",
        price: 0,
        in_stock: 0,
        category: "",
        slider: "false",
    });

    const [categories, setCategories] = useState([]);

    const handleFieldChange = (e) => {
        const { name, value, files, type } = e.target;

        let newValue = value;

        if (name === "category") {
            newValue = {
                id: newValue.split("_")[0],
                slug: newValue.split("_")[1],
            };
        }

        setFormData((prevFrom) => ({
            ...prevFrom,
            [name]: type === "file" ? files[0] : newValue,
        }));
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const url = bookApiURL.create();
        const res = await axiosClient.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.status === 200) {
            toast.success(res.message);
        }
        setFormData({
            name: "",
            description: "",
            image: "",
            author: "",
            price: 0,
            in_stock: 0,
            category: "",
            slider: "false",
        });
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const url = categoryApiURL.getAll();
            const res = await axiosClient.get(url);
            setCategories(res.data);
        };

        fetchCategories();
    }, [axiosClient]);

    return (
        <Form onSubmit={handleSubmitForm} encType="multipart/form-data">
            <FormGroup>
                <Label for="name">Tên sách</Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleFieldChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="description">Mô tả</Label>
                <Input
                    id="description"
                    name="description"
                    type="textarea"
                    value={formData.description}
                    onChange={handleFieldChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="author">Tác giả</Label>
                <Input
                    id="author"
                    name="author"
                    type="text"
                    value={formData.author}
                    onChange={handleFieldChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="image">Hình ảnh</Label>
                <Input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleFieldChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="price">Đơn giá</Label>
                <Input
                    id="price"
                    name="price"
                    type="number"
                    min={0}
                    value={formData.price}
                    onChange={handleFieldChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="stock">Số lượng</Label>
                <Input
                    id="stock"
                    name="in_stock"
                    type="number"
                    min={0}
                    value={formData.in_stock}
                    onChange={handleFieldChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="category">Danh mục</Label>
                <Input
                    id="category"
                    name="category"
                    type="select"
                    value={formData.category}
                    onChange={handleFieldChange}
                >
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map((category) => (
                        <option
                            key={category._id}
                            value={`${category._id}_${category.slug}`}
                        >
                            {category.name}
                        </option>
                    ))}
                </Input>
            </FormGroup>
            <FormGroup tag="fieldset">
                <Label>Slider</Label>
                <FormGroup check>
                    <Input
                        name="slider"
                        type="radio"
                        value="true"
                        checked={formData.slider === "true"}
                        onChange={handleFieldChange}
                    />
                    <Label check>True</Label>
                </FormGroup>
                <FormGroup check>
                    <Input
                        name="slider"
                        type="radio"
                        value="false"
                        checked={formData.slider === "false"}
                        onChange={handleFieldChange}
                    />
                    <Label check>False</Label>
                </FormGroup>
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    );
}

export default FormCreateBook;
