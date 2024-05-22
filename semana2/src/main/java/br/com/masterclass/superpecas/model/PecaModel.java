package br.com.masterclass.superpecas.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Pecas")
public class PecaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PecaID", nullable = false)
    private int id;

    @Column(name = "Nome", nullable = false)
    private String nome;

    @Column(name = "Descricao", nullable = false)
    private String descricao;

    @Column(name = "NumeroSerie", nullable = false)
    private String numeroSerie;

    @Column(name = "Fabricante", nullable = false)
    private String fabricante;

    @ManyToOne
    @JoinColumn(name = "CarroID", nullable = false)
    private CarroModel carro;

    // Getters e setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getNumeroSerie() {
        return numeroSerie;
    }

    public void setNumeroSerie(String numeroSerie) {
        this.numeroSerie = numeroSerie;
    }

    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public CarroModel getCarro() {
        return carro;
    }

    public void setCarro(CarroModel carro) {
        this.carro = carro;
    }
}
