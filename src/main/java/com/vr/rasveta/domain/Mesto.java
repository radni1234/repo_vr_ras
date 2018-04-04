package com.vr.rasveta.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Mesto.
 */
@Entity
@Table(name = "mesto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Mesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "naziv")
    private String naziv;

    @ManyToOne
    private Opstina opstina;

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

    public Mesto naziv(String naziv) {
        this.naziv = naziv;
        return this;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public Opstina getOpstina() {
        return opstina;
    }

    public Mesto opstina(Opstina opstina) {
        this.opstina = opstina;
        return this;
    }

    public void setOpstina(Opstina opstina) {
        this.opstina = opstina;
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
        Mesto mesto = (Mesto) o;
        if (mesto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mesto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mesto{" +
            "id=" + getId() +
            ", naziv='" + getNaziv() + "'" +
            "}";
    }
}
