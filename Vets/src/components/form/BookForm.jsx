import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, createBook, updateBook } from "../../service/books.service";
import { getAllAuthors } from "../../service/authors.service";
import { getAllPublishers } from "../../service/publishers.service";
import BlankForm from "./BlankForm";
import { useForm } from "react-hook-form";
import "../../styles/style.scss";

const BookForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({ mode: "onChange" });

  useEffect(() => {
    const fetchMeta = async () => {
      const authorsRes = await getAllAuthors();
      const publishersRes = await getAllPublishers();
      setAuthors(authorsRes);
      setPublishers(publishersRes);

      if (isEditMode) {
        const book = await getBookById(id);
        setValue('bookTitle', book.title);
        setValue('bookPageCount', book.pageCount);
        setValue('bookPublishDate', new Date(book.publishedDate).toISOString().split('T')[0]);
        setValue('bookIsbn', book.isbn);
        setValue("bookAuthor", book.author?.id ?? "");
        setValue("bookPublisher", book.publisher?.id ?? "");
      }
    };
    fetchMeta();
  }, [id, isEditMode, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      id: isEditMode ? Number(id) : undefined,
      title: data.bookTitle,
      pageCount: Number(data.bookPageCount),
      publishedDate: data.bookPublishDate,
      isbn: data.bookIsbn,
      authorId: String(data.bookAuthor),
      publisherId: String(data.bookPublisher),
    };

    try {
      if (isEditMode) {
        await updateBook(id, payload);
        navigate("/books", { state: { message: "Knjiga uspešno izmenjena." } });
      } else {
        await createBook(payload);
        navigate("/books", { state: { message: "Knjiga uspešno dodata." } });
      }
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <BlankForm
      register={register}
      errors={errors}
      reset={reset}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      authors={authors}
      publishers={publishers}
    />
  );
};

export default BookForm;