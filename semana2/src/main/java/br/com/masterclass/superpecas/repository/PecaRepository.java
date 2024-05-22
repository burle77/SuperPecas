package br.com.masterclass.superpecas.repository;

import br.com.masterclass.superpecas.model.DTO.TopCarroPecasDTO;
import br.com.masterclass.superpecas.model.PecaModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PecaRepository extends JpaRepository<PecaModel, Integer> {

    Page<PecaModel> findAll(Pageable pageable);

    @Query("SELECT c FROM PecaModel c WHERE lower(c.nome) like lower(concat('%', ?1,'%')) AND lower(c.numeroSerie) like lower(concat('%', ?1,'%'))")
    PecaModel findByNomeAndNumeroSerie(String nome, String numeroSerie);

    @Query("SELECT c FROM PecaModel c WHERE lower(c.nome) like lower(concat('%', ?1,'%')) OR lower(c.numeroSerie) like lower(concat('%', ?1,'%')) OR lower(c.fabricante) like lower(concat('%', ?1,'%'))")
    Page<PecaModel> findByNomeOrNumeroSerieOrFabricante(String termo, Pageable pageable);

    List<PecaModel> findByCarroId(int carroId);

    @Query(nativeQuery = true, value = "SELECT Count(pe.PecaID) AS quantidade, CONCAT(ca.NomeModelo, '/', ca.Fabricante) AS carro FROM Pecas pe "
        + "INNER JOIN Carros ca ON ca.CarroID = pe.CarroID "
        + "GROUP BY ca.NomeModelo, ca.Fabricante ORDER BY Count(pe.PecaID) DESC LIMIT 10")
    List<TopCarroPecasDTO> findTop10CarrosComMaisPecas();
}
