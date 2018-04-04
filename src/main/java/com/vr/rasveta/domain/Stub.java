package com.vr.rasveta.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Stub.
 */
@Entity
@Table(name = "stub")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Stub implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "adresa")
    private String adresa;

    @Column(name = "lon_d")
    private Double lonD;

    @Column(name = "lat_d")
    private Double latD;

    @Column(name = "rbr")
    private Integer rbr;

    @Column(name = "adresa_slike")
    private String adresaSlike;

    @ManyToOne
    private Mesto mesto;

    @ManyToOne
    private StubTip stubTip;

    @ManyToOne
    private Status status;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdresa() {
        return adresa;
    }

    public Stub adresa(String adresa) {
        this.adresa = adresa;
        return this;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public Double getLonD() {
        return lonD;
    }

    public Stub lonD(Double lonD) {
        this.lonD = lonD;
        return this;
    }

    public void setLonD(Double lonD) {
        this.lonD = lonD;
    }

    public Double getLatD() {
        return latD;
    }

    public Stub latD(Double latD) {
        this.latD = latD;
        return this;
    }

    public void setLatD(Double latD) {
        this.latD = latD;
    }

    public Integer getRbr() {
        return rbr;
    }

    public Stub rbr(Integer rbr) {
        this.rbr = rbr;
        return this;
    }

    public void setRbr(Integer rbr) {
        this.rbr = rbr;
    }

    public String getAdresaSlike() {
        return adresaSlike;
    }

    public Stub adresaSlike(String adresaSlike) {
        this.adresaSlike = adresaSlike;
        return this;
    }

    public void setAdresaSlike(String adresaSlike) {
        this.adresaSlike = adresaSlike;
    }

    public Mesto getMesto() {
        return mesto;
    }

    public Stub mesto(Mesto mesto) {
        this.mesto = mesto;
        return this;
    }

    public void setMesto(Mesto mesto) {
        this.mesto = mesto;
    }

    public StubTip getStubTip() {
        return stubTip;
    }

    public Stub stubTip(StubTip stubTip) {
        this.stubTip = stubTip;
        return this;
    }

    public void setStubTip(StubTip stubTip) {
        this.stubTip = stubTip;
    }

    public Status getStatus() {
        return status;
    }

    public Stub status(Status status) {
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
        Stub stub = (Stub) o;
        if (stub.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stub.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Stub{" +
            "id=" + getId() +
            ", adresa='" + getAdresa() + "'" +
            ", lonD=" + getLonD() +
            ", latD=" + getLatD() +
            ", rbr=" + getRbr() +
            ", adresaSlike='" + getAdresaSlike() + "'" +
            "}";
    }
}
