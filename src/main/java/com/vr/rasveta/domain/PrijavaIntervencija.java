package com.vr.rasveta.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A PrijavaIntervencija.
 */
@Entity
@Table(name = "prijava_intervencija")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PrijavaIntervencija implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "opis")
    private String opis;

    @Column(name = "datum")
    private Instant datum;

    @ManyToOne
    private IntervencijaTip intervencijaTip;

    @ManyToOne
    private PrijavaStatus prijavaStatus;

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

    public PrijavaIntervencija opis(String opis) {
        this.opis = opis;
        return this;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public Instant getDatum() {
        return datum;
    }

    public PrijavaIntervencija datum(Instant datum) {
        this.datum = datum;
        return this;
    }

    public void setDatum(Instant datum) {
        this.datum = datum;
    }

    public IntervencijaTip getIntervencijaTip() {
        return intervencijaTip;
    }

    public PrijavaIntervencija intervencijaTip(IntervencijaTip intervencijaTip) {
        this.intervencijaTip = intervencijaTip;
        return this;
    }

    public void setIntervencijaTip(IntervencijaTip intervencijaTip) {
        this.intervencijaTip = intervencijaTip;
    }

    public PrijavaStatus getPrijavaStatus() {
        return prijavaStatus;
    }

    public PrijavaIntervencija prijavaStatus(PrijavaStatus prijavaStatus) {
        this.prijavaStatus = prijavaStatus;
        return this;
    }

    public void setPrijavaStatus(PrijavaStatus prijavaStatus) {
        this.prijavaStatus = prijavaStatus;
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
        PrijavaIntervencija prijavaIntervencija = (PrijavaIntervencija) o;
        if (prijavaIntervencija.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), prijavaIntervencija.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PrijavaIntervencija{" +
            "id=" + getId() +
            ", opis='" + getOpis() + "'" +
            ", datum='" + getDatum() + "'" +
            "}";
    }
}
