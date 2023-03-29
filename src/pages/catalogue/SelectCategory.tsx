import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';
import {
  catAndSubCategory,
  getCatalogueCategory,
  getCatalogueSubCategory,
} from '../../services/catalogue/singleCatalouge';
import { catalogueSelectors } from '../../store/catalogue';
import { SystemState } from '../../store/storeTypes';

const SelectCategory = () => {
  const dispatch =
    useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();
  const catalogueState = useSelector(catalogueSelectors.getCatalogueState);
  const { categoryData } = catalogueState;
  const { subcategoryData } = catalogueState;

  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');

  useEffect(() => {
    dispatch(getCatalogueCategory());
  }, []);

  useEffect(() => {
    if (categoryId !== '') {
      dispatch(getCatalogueSubCategory(categoryId));
    }
  }, [categoryId]);

  useEffect(() => {
    if (subCategoryId !== '') {
      const prepareData = {
        category,
        subCategory,
        categoryId,
        subCategoryId,
      };
      console.log(prepareData, 'prepareData');
      dispatch(catAndSubCategory(prepareData));
    }
  }, [subCategoryId]);

  const selectCategory = (e: any) => {
    setCategoryId(e.target.value);
    setCategory(e.target.options[e.target.selectedIndex].text);
  };

  const selectSubcategory = (e: any) => {
    setSubCategoryId(e.target.value);
    setSubCategory(e.target.options[e.target.selectedIndex].text);
  };

  return (
    <div className="tab-content col-md-10 p-0" id="nav-tabContent">
      <div
        className="tab-pane fade show active"
        id="nav4"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
      >
        <div className="orng-head oddrflx">
          <p>Catalog uploads {`>`} Add single catalog</p>
          <p>
            <a href="#" className="active">
              Select category
            </a>
            <Link
              to={`/${ROUTER_URL_CONSTANT.CATALOGUE_PRODUCT}/${ROUTER_URL_CONSTANT.CATALOGUE_PRODUCT_INFO}`}
            >
              Add Product Info
            </Link>
          </p>
        </div>
        <div className="col-md-12 whtbox">
          <div className="panel-box h600">
            <div className="deletes border-0 frmset">
              <form className="example" action="action_page.php">
                <input
                  type="text"
                  placeholder="Search by Gemstones, Rudraksha, Pooja Samagri"
                  name="search"
                  className="form-control"
                />
                <button type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div>

            <div className="deletes border-0">
              <div className="deletes-left inventoring1 payment11">
                <div className="form-group row m-0">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Browse :{' '}
                  </label>
                  <div className="">
                    <select
                      name="service"
                      id="cars"
                      className="form-control"
                      onChange={selectCategory}
                    >
                      <option value="">Select a Category</option>

                      {categoryData.length > 0 &&
                        categoryData.map((item: any, index: number) => {
                          return (
                            <option key={index} value={item.id}>
                              {item?.title}
                            </option>
                          );
                        })}
                      {/*  <option value="">Books </option>
                      <option value="">Pooja Samagri </option>
                      <option value="">Gemstones </option>
                      <option value="">Yantras </option>
                      <option value="">Jewellery Ornaments </option>
                      <option value=""> Idols frames</option>
                      <option value="">Gaumata Products </option>
                      <option value="">Clothes </option>
                      <option value="">Vastu </option>
                      <option value="">Rudraksha </option>
                      <option value="">Combinations </option>
                      <option value="">Combinations </option> */}
                    </select>
                  </div>

                  <div className=" ml-3">
                    <select
                      name="service"
                      id="cars"
                      className="form-control"
                      onChange={selectSubcategory}
                    >
                      <option value="">Sub Category</option>

                      {subcategoryData.length > 0 &&
                        subcategoryData.map((item: any, index: number) => {
                          return (
                            <option key={index} value={item.id}>
                              {item?.title}
                            </option>
                          );
                        })}
                      {/*    <option value="">1 Mukhi Rudraksha </option>
                      <option value="">2 Mukhi Rudraksha </option>
                      <option value="">3 Mukhi Rudraksha </option>
                      <option value="">4 Mukhi Rudraksha </option>
                      <option value="">5 Mukhi Rudraksha </option>
                      <option value="">6 Mukhi Rudraksha </option>
                      <option value="">7 Mukhi Rudraksha </option>
                      <option value="">8 Mukhi Rudraksha </option>
                      <option value="">9 Mukhi Rudraksha </option>
                      <option value="">10 Mukhi Rudraksha </option>
                      <option value="">11 Mukhi Rudraksha </option>
                      <option value="">12 Mukhi Rudraksha </option>
                      <option value="">13 Mukhi Rudraksha </option>
                      <option value="">14 Mukhi Rudraksha </option>
                      <option value="">15 Mukhi Rudraksha </option> */}
                    </select>
                  </div>
                  <Link
                    to={`/${ROUTER_URL_CONSTANT.CATALOGUE_PRODUCT}/${ROUTER_URL_CONSTANT.CATALOGUE_PRODUCT_INFO}`}
                  >
                    <input
                      type="button"
                      name=""
                      className="inventedit"
                      value="Continue"
                      disabled={
                        categoryId === '' || subCategoryId === '' ? true : false
                      }
                    />
                  </Link>
                </div>
              </div>
              <div className="deletes-right paymeeditbtn"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCategory;
