package com.vr.rasveta.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A UgovorMaterijalStav.
 */
@Entity
@Table(name = "ugovor_materijal_stav")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UgovorMaterijalStav implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "naziv")
    private String naziv;

    @Column(name = "cena")
    private Double cena;

    @ManyToOne
    private UgovorMaterijal ugovorMaterijal;

    @ManyToOne
    private JedMere jedMere;

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

    public UgovorMaterijalStav naziv(String naziv) {
        this.naziv = naziv;
        return this;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public Double getCena() {
        return cena;
    }

    public UgovorMaterijalStav cena(Double cena) {
        this.cena = cena;
        return this;
    }

    public void setCena(Double cena) {
        this.cena = cena;
    }

    public UgovorMaterijal getUgovorMaterijal() {
        return ugovorMaterijal;
    }

    public UgovorMaterijalStav ugovorMaterijal(UgovorMaterijal ugovorMaterijal) {
        this.ugovorMaterijal = ugovorMaterijal;
        return this;
    }

    public void setUgovorMaterijal(UgovorMaterijal ugovorMaterijal) {
        this.ugovorMaterijal = ugovorMaterijal;
    }

    public JedMere getJedMere() {
        return jedMere;
    }

    public UgovorMaterijalStav jedMere(JedMere jedMere) {
        this.jedMere = jedMere;
        return this;
    }

    public void setJedMere(JedMere jedMere) {
        this.jedMere = jedMere;
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
        UgovorMaterijalStav ugovorMaterijalStav = (UgovorMaterijalStav) o;
        if (ugovorMaterijalStav.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ugovorMaterijalStav.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UgovorMaterijalStav{" +
            "id=" + getId() +
            ", naziv='" + getNaziv() + "'" +
            ", cena=" + getCena() +
            "}";
    }
}
