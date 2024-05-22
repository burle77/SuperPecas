package br.com.masterclass.superpecas.controller;

import br.com.masterclass.superpecas.model.DTO.PecaDTO;
import br.com.masterclass.superpecas.model.DTO.TopCarroPecasDTO;
import br.com.masterclass.superpecas.model.PecaModel;
import br.com.masterclass.superpecas.service.PecaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pecas")
public class PecaController {

    @Autowired
    private PecaService pecaService;

    @Autowired
    private ModelMapper modelMapper;

    @Operation(summary = "Lista peça por id", description = "Lista peça pelo seu id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = PecaDTO.class)) }),
            @ApiResponse(responseCode = "404", description = "Peça não encontrada", content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<PecaDTO> buscaPeca(@PathVariable int id) {
        PecaModel pecaModel = pecaService.buscaPeca(id);

        if (pecaModel == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(modelMapper.map(pecaModel, PecaDTO.class), HttpStatus.OK);
    }

    @Operation(summary = "Lista todas as peças", description = "Lista todas as peças.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = PecaDTO[].class)) })
    })
    @GetMapping("/listaTodos")
    public ResponseEntity<List<PecaDTO>> listaPecas() {
        List<PecaModel> pecas = pecaService.listaPecas();
        List<PecaDTO> listaDTO = Arrays.asList(modelMapper.map(pecas, PecaDTO[].class));
        return new ResponseEntity<>(listaDTO, HttpStatus.OK);
    }

    @Operation(summary = "Lista peças paginado", description = "Lista todas as peças por página.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = PecaDTO[].class)) })
    })
    @GetMapping("/listaTodosPaginado")
    public ResponseEntity<Page<PecaDTO>> listaPecasPaginado(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<PecaModel> pecas = pecaService.listaPecasPaginado(paging);
        return new ResponseEntity<>(pecas.map(peca -> modelMapper.map(peca, PecaDTO.class)), HttpStatus.OK);
    }

    @Operation(summary = "Lista peças por nome ou número de série paginado", description = "Lista todas as peças por nome e/ou número de série por página.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = PecaDTO[].class)) })
    })
    @GetMapping("/listaTodosPaginado/{termo}")
    public ResponseEntity<Page<PecaDTO>> listaPecasPorNomeEOuNumeroSeriePaginado(@PathVariable String termo, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<PecaModel> pecas = pecaService.listaPecasPorNomeEOuNumeroSerie(termo, paging);
        return new ResponseEntity<>(pecas.map(peca -> modelMapper.map(peca, PecaDTO.class)), HttpStatus.OK);
    }

    @Operation(summary = "Grava peça", description = "Grava uma nova peça no sistema.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = PecaDTO.class)) }),
            @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content)
    })
    @PostMapping
    public ResponseEntity<PecaDTO> gravaPeca(@RequestBody PecaDTO data) {
        PecaModel pecaModel = modelMapper.map(data, PecaModel.class);
        pecaModel = pecaService.gravaPeca(pecaModel);

        if (pecaModel == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(modelMapper.map(pecaModel, PecaDTO.class), HttpStatus.OK);
    }

    @Operation(summary = "Atualiza peça", description = "Atualiza dados de uma peça existente no sistema.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = PecaDTO.class)) }),
            @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content)
    })
    @PutMapping
    public ResponseEntity<PecaDTO> editaPeca(@RequestBody PecaDTO data) {
        PecaModel pecaModel = modelMapper.map(data, PecaModel.class);
        pecaModel = pecaService.editaPeca(pecaModel);

        if (pecaModel == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(modelMapper.map(pecaModel, PecaDTO.class), HttpStatus.OK);
    }

    @Operation(summary = "Excluir peça", description = "Exclui uma peça do sistema.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = PecaDTO.class)) })
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluiPeca(@PathVariable int id) {
        pecaService.excluiPeca(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "Lista TOP 10 Carros com mais peças", description = "Lista TOP 10 Carros com mais peças.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = TopCarroPecasDTO[].class)) })
    })
    @GetMapping("/listaTop10CarroComMaisPecas")
    public ResponseEntity<List<TopCarroPecasDTO>> listaTop10CarroComMaisPecas() {
        List<TopCarroPecasDTO> carros = pecaService.listaTop10CarrosComMaisPecas();
        return new ResponseEntity<>(carros, HttpStatus.OK);
    }
}
