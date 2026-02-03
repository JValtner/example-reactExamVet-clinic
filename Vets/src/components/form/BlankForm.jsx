import React from "react";
import "../../styles/style.scss";

const BlankForm = ({ register, errors, reset, handleSubmit, onSubmit, authors, publishers }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="book-form">
      <label>
        Naslov:
        <input
          type="text"
          {...register('bookTitle', {
            required: 'Unesite naziv knjige',
            minLength: { value: 3, message: 'Naziv mora imati najmanje 3 karaktera' }
          })}
        />
        {errors.bookTitle && <p style={{ color: 'red' }}>{errors.bookTitle.message}</p>}
      </label>
      <label>
        Broj strana:
        <input
          type="number"
          {...register('bookPageCount', {
            required: 'Unesite broj strana knjige',
            min: { value: 1, message: 'Najmanje 1 strana' },
            max: { value: 5000, message: 'Najviše 5000 strana' }
          })}
        />
        {errors.bookPageCount && <p style={{ color: 'red' }}>{errors.bookPageCount.message}</p>}
      </label>
      <label>
        Datum izdavanja:
        <input
          type="date"
          {...register('bookPublishDate', { required: 'Unesite datum izdavanja' })}
        />
        {errors.bookPublishDate && <p style={{ color: 'red' }}>{errors.bookPublishDate.message}</p>}
      </label>
      <label>
        ISBN:
        <input
          type="text"
          {...register('bookIsbn', {
            required: 'Unesite ISBN broj',
            minLength: { value: 10, message: 'ISBN mora biti izmedju 10 ili 13 karaktera' },
            maxLength: { value: 13, message: 'ISBN mora biti izmedju 10 ili 13 karaktera' }
          })}
        />
        {errors.bookIsbn && <p style={{ color: 'red' }}>{errors.bookIsbn.message}</p>}
      </label>
      <label>
        Autor:
        <select {...register('bookAuthor', { required: 'Izaberite autora' })}>
          <option value="">-- Izaberite autora --</option>
          {authors.map(author => (
            <option key={author.id} value={String(author.id)}>{author.fullName}</option>
          ))}
        </select>
        {errors.bookAuthor && <p style={{ color: 'red' }}>{errors.bookAuthor.message}</p>}
      </label>
      <label>
        Izdavač:
        <select {...register('bookPublisher', { required: 'Izaberite izdavača' })}>
          <option value="">-- Izaberite izdavača --</option>
          {publishers.map(publisher => (
            <option key={publisher.id} value={publisher.id}>{publisher.name}</option>
          ))}
        </select>
        {errors.bookPublisher && <p style={{ color: 'red' }}>{errors.bookPublisher.message}</p>}
      </label>
      <div className="form-actions">
        <button type="submit">Sačuvaj</button>
        <button type="button" onClick={() => reset()}>Obriši</button>
      </div>
    </form>
  );
};

export default BlankForm;