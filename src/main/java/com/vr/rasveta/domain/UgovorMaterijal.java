package com.vr.rasveta.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A UgovorMaterijal.
 */
@Entity
@Table(name = "ugovor_materijal")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UgovorMaterijal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "opis")
    private String opis;

    @Column(name = "datum_od")
    private LocalDate datumOd;

    @Column(name = "datum_do")
    private LocalDate datumDo;

    @ManyToOne
    private Opstina opstina;

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

    public UgovorMaterijal opis(String opis) {
        this.opis = opis;
        return this;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public LocalDate getDatumOd() {
        return datumOd;
    }

    public UgovorMaterijal datumOd(LocalDate datumOd) {
        this.datumOd = datumOd;
        return this;
    }

    public void setDatumOd(LocalDate datumOd) {
        this.datumOd = datumOd;
    }

    public LocalDate getDatumDo() {
        return datumDo;
    }

    public UgovorMaterijal datumDo(LocalDate datumDo) {
        this.datumDo = datumDo;
        return this;
    }

    public void setDatumDo(LocalDate datumDo) {
        this.datumDo = datumDo;
    }

    public Opstina getOpstina() {
        return opstina;
    }

    public UgovorMaterijal opstina(Opstina opstina) {
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
        UgovorMaterijal ugovorMaterijal = (UgovorMaterijal) o;
        if (ugovorMaterijal.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ugovorMaterijal.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UgovorMaterijal{" +
            "id=" + getId() +
            ", opis='" + getOpis() + "'" +
            ", datumOd='" + getDatumOd() + "'" +
            ", datumDo='" + getDatumDo() + "'" +
            "}";
    }
}
