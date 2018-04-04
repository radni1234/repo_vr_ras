package com.vr.rasveta.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A PrijavaMaterijal.
 */
@Entity
@Table(name = "prijava_materijal")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PrijavaMaterijal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "kolicina")
    private Integer kolicina;

    @Column(name = "opis")
    private String opis;

    @Column(name = "datum")
    private Instant datum;

    @ManyToOne
    private MaterijalTip materijalTip;

    @ManyToOne
    private PrijavaIntervencija prijavaIntervencija;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getKolicina() {
        return kolicina;
    }

    public PrijavaMaterijal kolicina(Integer kolicina) {
        this.kolicina = kolicina;
        return this;
    }

    public void setKolicina(Integer kolicina) {
        this.kolicina = kolicina;
    }

    public String getOpis() {
        return opis;
    }

    public PrijavaMaterijal opis(String opis) {
        this.opis = opis;
        return this;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public Instant getDatum() {
        return datum;
    }

    public PrijavaMaterijal datum(Instant datum) {
        this.datum = datum;
        return this;
    }

    public void setDatum(Instant datum) {
        this.datum = datum;
    }

    public MaterijalTip getMaterijalTip() {
        return materijalTip;
    }

    public PrijavaMaterijal materijalTip(MaterijalTip materijalTip) {
        this.materijalTip = materijalTip;
        return this;
    }

    public void setMaterijalTip(MaterijalTip materijalTip) {
        this.materijalTip = materijalTip;
    }

    public PrijavaIntervencija getPrijavaIntervencija() {
        return prijavaIntervencija;
    }

    public PrijavaMaterijal prijavaIntervencija(PrijavaIntervencija prijavaIntervencija) {
        this.prijavaIntervencija = prijavaIntervencija;
        return this;
    }

    public void setPrijavaIntervencija(PrijavaIntervencija prijavaIntervencija) {
        this.prijavaIntervencija = prijavaIntervencija;
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
        PrijavaMaterijal prijavaMaterijal = (PrijavaMaterijal) o;
        if (prijavaMaterijal.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), prijavaMaterijal.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PrijavaMaterijal{" +
            "id=" + getId() +
            ", kolicina=" + getKolicina() +
            ", opis='" + getOpis() + "'" +
            ", datum='" + getDatum() + "'" +
            "}";
    }
}
