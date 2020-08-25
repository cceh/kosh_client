import {store} from 'react-easy-state';


const stateStore = store({

    collection_ids: ["Freedict", "Kosh Data", "CDSD", "C-SALT Sanskrit"],

    freedict_ids: [
        "afr_deu", "afr_eng", "ara_eng", "bre_fra", "ces_eng", "ckb_kmr", "cym_eng",
        "dan_eng", "deu_bul", "deu_eng", "deu_fin", "deu_fra", "deu_ind", "deu_ita",
        "deu_kur", "deu_nld", "deu_pol", "deu_por", "deu_rus", "deu_spa", "deu_swe",
        "deu_tur", "eng_afr", "eng_ara", "eng_bul", "eng_ces", "eng_cym", "eng_dan", "eng_deu",
        "eng_ell", "eng_fin", "eng_fra", "eng_gle", "eng_hin", "eng_hrv", "eng_hun", "eng_ita",
        "eng_jpn", "eng_lat", "eng_lit", "eng_nld", "eng_nor", "eng_pol", "eng_por", "eng_rom",
        "eng_rus", "eng_spa", "eng_srp", "eng_swe", "eng_swh", "eng_tur", "epo_eng", "fin_bul",
        "fin_deu", "fin_ell", "fin_eng", "fin_fra", "fin_ita", "fin_jpn", "fin_lat", "fin_nld",
        "fin_nor", "fin_pol", "fin_por", "fin_swe", "fra_bre", "fra_bul", "fra_deu", "fra_ell",
        "fra_eng", "fra_fin", "fra_ita", "fra_jpn", "fra_lat", "fra_nld", "fra_pol", "fra_por",
        "fra_rus", "fra_spa", "fra_swe", "fra_tur", "gla_deu", "gle_eng", "gle_pol", "hrv_eng",
        "hun_eng", "isl_eng", "ita_bul", "ita_deu", "ita_ell", "ita_eng", "ita_fin", "ita_jpn",
        "ita_pol", "ita_por", "ita_rus", "ita_swe", "ita_tur", "jpn_deu", "jpn_eng", "jpn_fra",
        "jpn_rus", "kha_deu", "kha_eng", "kur_deu", "kur_eng", "kur_tur", "lat_deu", "lat_eng",
        "lit_eng", "mkd_bul", "nld_deu", "nld_eng", "nld_fin", "nld_fra", "nld_ita", "nld_lat",
        "nld_lit", "nld_por", "nld_rus", "nld_spa", "nld_swe", "nno_nob", "oci_cat", "pol_deu",
        "pol_ell", "pol_eng", "pol_fin", "pol_fra", "pol_gle", "pol_ita", "pol_jpn", "pol_nld",
        "pol_nor", "pol_por", "pol_rus", "pol_spa", "pol_swe", "por_deu", "por_eng", "por_fra",
        "por_spa", "san_deu", "slk_eng", "spa_ast", "spa_deu", "spa_eng", "spa_por", "srp_eng",
        "swe_bul", "swe_deu", "swe_ell", "swe_eng", "swe_fin", "swe_fra", "swe_ita", "swe_jpn",
        "swe_lat", "swe_nor", "swe_pol", "swe_por", "swe_rus", "swe_spa", "swe_tur", "swh_eng",
        "swh_pol", "tur_deu", "tur_eng", "wol_fra"],

    kosh_data_ids: [
        "de_alcedo", "wordnet_en_synset", "ducange", "hiztegibatua", "tunico", "hoenig"],

    cdsd_ids: [
        "ap90", "acc", "ben", "cae", "bhs", "gst", "inm", "ieg", "md", "mci", "snp", "mw72",
        "mw", "pgn", "pui", "pe", "shs", "vei", "wil", "yat", "pwg", "pw", "ccs", "gra", "sch",
        "bur", "stc", "ae", "bor", "mwe", "bop", "krm", "skd", "vcp"],

    c_salt_sanskrit_ids:["mw", "ap90", "bhs", "vei", "pwg", "gra", "ae"],

    search: {
        entries: null,
        loading: false,
        value: "",
        field: "",
        fields: [],
        query_types: [],
        query_type: "",

    },

    dict_collection: {
        base_path: "",
        dict_ids: [],
        dict_id: ""
    },

    dict_spec: {
        raw: null
    },

    results: {
        display_fields: {}
    }


})

export default stateStore;