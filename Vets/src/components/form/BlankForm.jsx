import React from "react";
import "../../styles/style.scss";

const BlankForm = ({ register, errors, reset, handleSubmit, onSubmit, owners, veterenerians, animalTypes }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="book-form">
      <label>
        PetName:
        <input
          type="text"
          {...register('petName', {
            required: 'Unesite naziv pacijenta',
            minLength: { value: 3, message: 'Naziv mora imati najmanje 3 karaktera' }
          })}
        />
        {errors.petName && <p style={{ color: 'red' }}>{errors.petName.message}</p>}
      </label>
     
      <label>
        Owner Name:
        <select {...register('ownerName', { required: 'Izaberite vlasnika pacijenta' })}>
          <option value="">-- Izaberite vlasnika --</option>
          {owners.map(owner => (
            <option key={owner.id} value={String(owner.id)}>{owner.name + " " + owner.surname}</option>
          ))}
        </select>
        {errors.ownerName && <p style={{ color: 'red' }}>{errors.ownerName.message}</p>}
      </label>
      <label>
        Animal type:
        <select {...register('animalType', { required: 'Izaberite tip životinje' })}>
          <option value="">-- Izaberite tip životinje --</option>
          {animalTypes.map(animalType => (
            <option key={animalType.id} value={String(animalType.id)}>{animalType.name}</option>
          ))}
        </select>
        {errors.animalType && <p style={{ color: 'red' }}>{errors.animalType.message}</p>}
      </label>
      <label>
        Veterenerian:
        <select {...register('veterinarian', { required: 'Izaberite veterenara' })}>
          <option value="">-- Izaberite veterenara --</option>
          {veterenerians.map(veterinerian => (
            <option key={veterinerian.id} value={String(veterinerian.id)}>{veterinerian.name + " " + veterinerian.surname}</option>
          ))}
        </select>
        {errors.veterinarian && <p style={{ color: 'red' }}>{errors.veterinarian.message}</p>}
      </label>
      <label>
        Date of Birth:
        <input
          type="date"
          {...register('dateOfBirth', { required: 'Unesite datum rođenja pacijenta' })}
        />
        {errors.dateOfBirth && <p style={{ color: 'red' }}>{errors.dateOfBirth.message}</p>}
      </label>
      
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={() => reset()}>Delete</button>
      </div>
    </form>
  );
};

export default BlankForm;