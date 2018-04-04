package com.vr.rasveta.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A UgovorIntervencijaStav.
 */
@Entity
@Table(name = "ugovor_intervencija_stav")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UgovorIntervencijaStav implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "naziv")
    private String naziv;

    @Column(name = "cena")
    private Double cena;

    @ManyToOne
    private UgovorIntervencija ugovorIntervencija;

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

    public UgovorIntervencijaStav naziv(String naziv) {
        this.naziv = naziv;
        return this;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public Double getCena() {
        return cena;
    }

    public UgovorIntervencijaStav cena(Double cena) {
        this.cena = cena;
        return this;
    }

    public void setCena(Double cena) {
        this.cena = cena;
    }

    public UgovorIntervencija getUgovorIntervencija() {
        return ugovorIntervencija;
    }

    public UgovorIntervencijaStav ugovorIntervencija(UgovorIntervencija ugovorIntervencija) {
        this.ugovorIntervencija = ugovorIntervencija;
        return this;
    }

    public void setUgovorIntervencija(UgovorIntervencija ugovorIntervencija) {
        this.ugovorIntervencija = ugovorIntervencija;
    }

    public JedMere getJedMere() {
        return jedMere;
    }

    public UgovorIntervencijaStav jedMere(JedMere jedMere) {
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
        UgovorIntervencijaStav ugovorIntervencijaStav = (UgovorIntervencijaStav) o;
        if (ugovorIntervencijaStav.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ugovorIntervencijaStav.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UgovorIntervencijaStav{" +
            "id=" + getId() +
            ", naziv='" + getNaziv() + "'" +
            ", cena=" + getCena() +
            "}";
    }
}
