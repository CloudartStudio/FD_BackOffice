import style from "../../styles/modal.module.css";
import NotificationContext from "../../context/notificationContext";
import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import Toggle from "../../components/misc/toggle"

export default function NewCollaboratorModal({ onActionCloseModal }) {
	const HaveMoreSpecializationRef = useRef(null);
	const [newCollaborator, newCewCollaborator] = useState({
		nome: "",
        cognome: "",
        data_nascita: "",
        is_maschio: false,
        indirizzo: "",
        telefono: "",
		cellulare: "",
        email: "",
		partita_iva: "",
		documento: "",
		commerciale: false,
		note: "",
		specializzazione: ""
	});

	const [showMultipleSpecialization, setShowMultipleSpecialization] = useState(false);

	const [specializationFields, setSpecializationFields] = useState(['']);

	const addSpecializationField = () => { 
		setSpecializationFields([...specializationFields, '']); 
	};

	const handleSpecializationFieldChange = (index, value) => {
		const updatedFields = [...specializationFields];
		updatedFields[index] = value;
		setSpecializationFields(updatedFields);
	};

	const removeSpecializationField = (index) => {
		const updatedFields = [...specializationFields];
		updatedFields.splice(index, 1);
		setSpecializationFields(updatedFields);
	};

    const handleCheckboxChange = () => {
        // Aggiorna lo stato in base al valore corrente della checkbox
        setShowMultipleSpecialization(HaveMoreSpecializationRef.current.checked);
    };

    const [errors, setErrors] = useState({});

	const handleOnChangeForm = (e) => {
        if (handleValidationOnChange(e.target)) {
            newCewCollaborator({ ...newCollaborator, [e.target.name]: e.target.value });
        }
    };

	return (
		<>
			<div className={style.Modal}>
				<div className={style.ModalHeader}>
					<h5>NUOVO COLLABORATORE</h5>
					<span onClick={onActionCloseModal} className={style.closeBtnModal}>
                        ✖
                    </span>
				</div>

				<div className={style.ModalBody}>
					<div className={style.ModalBodyLabelContainer}>
						{/* nome */}
                        <div className={style.ModalField}>
                            <label>Nome</label>
                            <br />
                            <input type={"text"} placeholder="Nome..." name="nome" onChange={handleOnChangeForm} value={newCollaborator.nome}></input>
                            {errors.nome && <p className={style.error}>{errors.nome}</p>}
                        </div>

						{/* cognome */}
                        <div className={style.ModalField}>
                            <label>Cognome</label>
                            <br />
                            <input type={"text"} placeholder="Cognome..." name="cognome" onChange={handleOnChangeForm} value={newCollaborator.cognome}></input>
                            {errors.cognome && <p className={style.error}>{errors.cognome}</p>}
                        </div>

						{/* data_nascita */}
                        <div className={style.ModalField}>
                            <label>Data Di Nascita</label>
                            <br />
                            <input type={"date"} placeholder="Data Di Nascita..." name="data_nascita" onChange={handleOnChangeForm} value={newCollaborator.data_nascita}></input>
                            {errors.data_nascita && <p className={style.error}>{errors.data_nascita}</p>}
                        </div>
						
						{/* is_maschio */}
                        <div className={style.ModalField}>
                            <Toggle 
                                data={[{label: "M"}, {label: "F"}]}
                                setStato={() => {handleOnChangeForm({target: {name: "is_maschio", value: !newCollaborator.is_maschio}})}}
                                stato={newCollaborator.is_maschio}
                            ><h5 className={style.ModalField}>Sesso</h5></Toggle>
                        </div>
					</div>

					<div className={style.ModalBodyLabelContainer}>
						{/* indirizzo */}
                        <div className={style.ModalField}>
                            <label>Indirizzo</label>
                            <br />
                            <input type={"text"} placeholder="Indirizzo..." name="indirizzo" onChange={handleOnChangeForm} value={newCollaborator.indirizzo}></input>
                            {errors.indirizzo && <p className={style.error}>{errors.indirizzo}</p>}
                        </div>

						{/* telefono */}
                        <div className={style.ModalField}>
                            <label>Telefono</label>
                            <br />
                            <input type={"text"} placeholder="Telefono..." name="telefono" onChange={handleOnChangeForm} value={newCollaborator.telefono}></input>
                            {errors.telefono && <p className={style.error}>{errors.telefono}</p>}
                        </div>
						
						{/* cellulare */}
                        <div className={style.ModalField}>
                            <label>Cellulare</label>
                            <br />
                            <input type={"text"} placeholder="Cellulare..." name="cellulare" onChange={handleOnChangeForm} value={newCollaborator.cellulare}></input>
                            {errors.cellulare && <p className={style.error}>{errors.cellulare}</p>}
                        </div>

						{/* email */}
                        <div className={style.ModalField}>
                            <label>Email</label>
                            <br />
                            <input type={"text"} placeholder="Email..." name="email" onChange={handleOnChangeForm} value={newCollaborator.email}></input>
                            {errors.email && <p className={style.error}>{errors.email}</p>}
                        </div>
					</div>

					<div className={style.ModalBodyLabelContainer}>
						{/* partita_iva */}
                        <div className={style.ModalField}>
                            <label>Partita Iva</label>
                            <br />
                            <input type={"text"} placeholder="Partita Iva..." name="partita_iva" onChange={handleOnChangeForm} value={newCollaborator.partita_iva}></input>
                            {errors.partita_iva && <p className={style.error}>{errors.partita_iva}</p>}
                        </div>

						{/* Documento */}
						<div className={style.ModalField}>
							<label>Carica Documento</label>
							<input id="file-upload" type={"file"} />
						</div>
					</div>

					{/* commerciale */}
					<div className={style.ModalField}>
						<label>Commerciale</label>
						<br />
						<input type={"checkbox"} placeholder="Commerciale..." name="commerciale" onChange={handleOnChangeForm} value={newCollaborator.commerciale}></input>
						{errors.partita_iva && <p className={style.error}>{errors.partita_iva}</p>}
					</div>

					{/* note */}
					<div className={style.ModalField}>
						<label>Note</label>
						<br />
						<textarea type={"text"} placeholder="Note..." name="note" onChange={handleOnChangeForm} value={newCollaborator.note}></textarea>
						{errors.note && <p className={style.error}>{errors.note}</p>}
					</div>

					{/* specializzazione */}
					<div className={style.ModalField}>
						{" "}
						<div className={style.ModalFieldSection}>
							<h3>Specializzazione</h3>
							<input
								ref={HaveMoreSpecializationRef}
								type="checkbox"
								placeholder="Piu Specializzazioni..."
								onChange={handleCheckboxChange}
							></input>
							<br />
							<label>Specializzazione</label>
							<input
								type="text"
								placeholder="Specializzazione..."
							></input>
							<br />
							<br />
							{showMultipleSpecialization && (
								<>
									{specializationFields.map((field, index) => (
										<div key={index} className={style.ModalFieldSection}>
											<label>Specializzazione</label>
											<br />
											<input
												type="text"
												value={field}
												placeholder="Specializzazione..."
												onChange={(e) => handleSpecializationFieldChange(index, e.target.value)}
											/>
											<br />
											<button onClick={() => removeSpecializationField(index)}>Rimuovi</button>
											<br />
											<br />
										</div>
									))}
									<br />
									<br />
									<button 
										className={style.success}
										onClick={addSpecializationField}
									>Aggiungi</button>
								</>
							)}
							<br />
									<br />
						</div>
					</div>

				</div>

				<div className={style.ModalFoot}>
					<button
							className={style.Success}
							onClick={() => {
								submitForm();
							}}
						>
							INVIA
					</button>
				</div>
			</div>
		</>
	);
}