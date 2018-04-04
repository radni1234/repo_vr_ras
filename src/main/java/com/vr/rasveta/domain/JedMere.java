package com.vr.rasveta.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A JedMere.
 */
@Entity
@Table(name = "jed_mere")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class JedMere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "naziv")
    private String naziv;

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

    public JedMere naziv(String naziv) {
        this.naziv = naziv;
        return this;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
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
        JedMere jedMere = (JedMere) o;
        if (jedMere.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jedMere.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "JedMere{" +
            "id=" + getId() +
            ", naziv='" + getNaziv() + "'" +
            "}";
    }
}
