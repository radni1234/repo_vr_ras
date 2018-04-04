package com.vr.rasveta.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SvetiljkaTip.
 */
@Entity
@Table(name = "svetiljka_tip")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SvetiljkaTip implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "naziv")
    private String naziv;

    @Column(name = "izvor")
    private String izvor;

    @Column(name = "snaga")
    private Double snaga;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNaziv() {
        return naziv;
    }

    public SvetiljkaTip naziv(String naziv) {
        this.naziv = naziv;
        return this;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getIzvor() {
        return izvor;
    }

    public SvetiljkaTip izvor(String izvor) {
        this.izvor = izvor;
        return this;
    }

    public void setIzvor(String izvor) {
        this.izvor = izvor;
    }

    public Double getSnaga() {
        return snaga;
    }

    public SvetiljkaTip snaga(Double snaga) {
        this.snaga = snaga;
        return this;
    }

    public void setSnaga(Double snaga) {
        this.snaga = snaga;
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
        SvetiljkaTip svetiljkaTip = (SvetiljkaTip) o;
        if (svetiljkaTip.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), svetiljkaTip.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SvetiljkaTip{" +
            "id=" + getId() +
            ", naziv='" + getNaziv() + "'" +
            ", izvor='" + getIzvor() + "'" +
            ", snaga=" + getSnaga() +
            "}";
    }
}
