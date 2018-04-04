package com.vr.rasveta.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A PrijavaStatus.
 */
@Entity
@Table(name = "prijava_status")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PrijavaStatus implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "opis")
    private String opis;

    @Column(name = "datum")
    private Instant datum;

    @Column(name = "trajanje")
    private Long trajanje;

    @ManyToOne
    private Prijava prijava;

    @ManyToOne
    private Status status;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOpis() {
        return opis;
    }

    public PrijavaStatus opis(String opis) {
        this.opis = opis;
        return this;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public Instant getDatum() {
        return datum;
    }

    public PrijavaStatus datum(Instant datum) {
        this.datum = datum;
        return this;
    }

    public void setDatum(Instant datum) {
        this.datum = datum;
    }

    public Long getTrajanje() {
        return trajanje;
    }

    public PrijavaStatus trajanje(Long trajanje) {
        this.trajanje = trajanje;
        return this;
    }

    public void setTrajanje(Long trajanje) {
        this.trajanje = trajanje;
    }

    public Prijava getPrijava() {
        return prijava;
    }

    public PrijavaStatus prijava(Prijava prijava) {
        this.prijava = prijava;
        return this;
    }

    public void setPrijava(Prijava prijava) {
        this.prijava = prijava;
    }

    public Status getStatus() {
        return status;
    }

    public PrijavaStatus status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PrijavaStatus prijavaStatus = (PrijavaStatus) o;
        if (prijavaStatus.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), prijavaStatus.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PrijavaStatus{" +
            "id=" + getId() +
            ", opis='" + getOpis() + "'" +
            ", datum='" + getDatum() + "'" +
            ", trajanje=" + getTrajanje() +
            "}";
    }
}
