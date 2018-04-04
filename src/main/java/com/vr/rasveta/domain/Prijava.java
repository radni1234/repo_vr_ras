package com.vr.rasveta.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Prijava.
 */
@Entity
@Table(name = "prijava")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Prijava implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "opis")
    private String opis;

    @Column(name = "prijavio")
    private String prijavio;

    @Column(name = "telefon")
    private String telefon;

    @Column(name = "email")
    private String email;

    @Column(name = "datum")
    private Instant datum;

    @ManyToOne
    private Stub stub;

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

    public Prijava opis(String opis) {
        this.opis = opis;
        return this;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public String getPrijavio() {
        return prijavio;
    }

    public Prijava prijavio(String prijavio) {
        this.prijavio = prijavio;
        return this;
    }

    public void setPrijavio(String prijavio) {
        this.prijavio = prijavio;
    }

    public String getTelefon() {
        return telefon;
    }

    public Prijava telefon(String telefon) {
        this.telefon = telefon;
        return this;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getEmail() {
        return email;
    }

    public Prijava email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Instant getDatum() {
        return datum;
    }

    public Prijava datum(Instant datum) {
        this.datum = datum;
        return this;
    }

    public void setDatum(Instant datum) {
        this.datum = datum;
    }

    public Stub getStub() {
        return stub;
    }

    public Prijava stub(Stub stub) {
        this.stub = stub;
        return this;
    }

    public void setStub(Stub stub) {
        this.stub = stub;
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
        Prijava prijava = (Prijava) o;
        if (prijava.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), prijava.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Prijava{" +
            "id=" + getId() +
            ", opis='" + getOpis() + "'" +
            ", prijavio='" + getPrijavio() + "'" +
            ", telefon='" + getTelefon() + "'" +
            ", email='" + getEmail() + "'" +
            ", datum='" + getDatum() + "'" +
            "}";
    }
}
