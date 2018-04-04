package com.vr.rasveta.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Svetiljka.
 */
@Entity
@Table(name = "svetiljka")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Svetiljka implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "kom")
    private Integer kom;

    @ManyToOne
    private Stub stub;

    @ManyToOne
    private SvetiljkaTip svetiljkaTip;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getKom() {
        return kom;
    }

    public Svetiljka kom(Integer kom) {
        this.kom = kom;
        return this;
    }

    public void setKom(Integer kom) {
        this.kom = kom;
    }

    public Stub getStub() {
        return stub;
    }

    public Svetiljka stub(Stub stub) {
        this.stub = stub;
        return this;
    }

    public void setStub(Stub stub) {
        this.stub = stub;
    }

    public SvetiljkaTip getSvetiljkaTip() {
        return svetiljkaTip;
    }

    public Svetiljka svetiljkaTip(SvetiljkaTip svetiljkaTip) {
        this.svetiljkaTip = svetiljkaTip;
        return this;
    }

    public void setSvetiljkaTip(SvetiljkaTip svetiljkaTip) {
        this.svetiljkaTip = svetiljkaTip;
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
        Svetiljka svetiljka = (Svetiljka) o;
        if (svetiljka.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), svetiljka.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Svetiljka{" +
            "id=" + getId() +
            ", kom=" + getKom() +
            "}";
    }
}
