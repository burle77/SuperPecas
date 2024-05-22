package br.com.masterclass.superpecas.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "carros")
public class CarroModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CarroID", nullable = false)
    private Integer id;

    @Column(name = "NomeModelo", nullable = false)
    private String nomeModelo;

    @Column(name = "Fabricante", nullable = false)
    private String fabricante;

    @Column(name = "CodigoUnico", nullable = false, unique = true)
    private String codigoUnico;

    // Getters e setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNomeModelo() {
        return nomeModelo;
    }

    public void setNomeModelo(String nomeModelo) {
        this.nomeModelo = nomeModelo;
    }

    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public String getCodigoUnico() {
        return codigoUnico;
    }

    public void setCodigoUnico(String codigoUnico) {
        this.codigoUnico = codigoUnico;
    }
}
