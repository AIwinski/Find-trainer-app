import React from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import PropTypes from "prop-types";

class DebouncedSearchInput extends React.Component {
    //propsy: funkcja zwracajaca dane lub blad od api, delay, ilosc wyswietlanych wynikow pod inputem, callback po submicie, placeholder inputu, name inputu

    constructor(props) {
        super(props);
        this.searchAPIDebounced = AwesomeDebouncePromise(
            this.props.dataSource,
            this.props.delay
        );
        this.state = {
            input: "",
            results: [],
            isFocused: false,
            selected: null
        };
    }

    onKeydown = async e => {
        if (!this.state.isFocused || this.state.results.length === 0) {
            return;
        }

        if (e.key === "Escape") {
            this.setState({ isFocused: false });
        } else if (e.key === "ArrowDown") {
            if (
                this.state.selected === this.state.results.length - 1 ||
                this.state.selected === null
            ) {
                await this.setState({ selected: 0 });
            } else {
                await this.setState({
                    selected: this.state.selected + 1
                });
            }
            this.setState({
                input: this.state.results[this.state.selected]
            });
        } else if (e.key === "ArrowUp") {
            if (this.state.selected === 0 || this.state.selected === null) {
                await this.setState({
                    selected: this.state.results.length - 1
                });
            } else {
                await this.setState({
                    selected: this.state.selected - 1
                });
            }

            this.setState({
                input: this.state.results[this.state.selected]
            });
        }
    };

    onInputChange = async e => {
        const input = e.target.value;
        this.setState({ input: input, isFocused: false, selected: null });
        if (input.length < 1) {
            this.setState({ results: [] });
        } else {
            const results = await this.searchAPIDebounced(input);
            console.log(results);
            this.setState({ results: results.data.cities, isFocused: true });
        }
    };

    onFormSubmit = e => {
        e.preventDefault();
        this.setState({ isFocused: false });
        this.props.callback(this.state.input);
    };

    onFocus = () => {
        this.setState({ isFocused: true });
    };

    handleClickOutside = event => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ isFocused: false });
        }
    };

    setWrapperRef = node => {
        this.wrapperRef = node;
    };

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
        this.setState = () => {};
    }

    render() {
        return (
            <form
                className="debounced-form"
                ref={this.setWrapperRef}
                onSubmit={this.onFormSubmit}
                onKeyDown={this.onKeydown}
            >
                <input
                    autoFocus={false}
                    autoComplete="off"
                    className={
                        "debounced-form__input " +
                        (this.state.results.length > 0 && this.state.isFocused
                            ? "debounced-form__input--has-results"
                            : "")
                    }
                    type="text"
                    onChange={this.onInputChange}
                    value={this.state.input}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    onFocus={this.onFocus}
                />
                {this.state.isFocused && (
                    <div className="debounced-form__results">
                        {this.state.results.map((element, index) => {
                            return (
                                <div
                                    className={
                                        "debounced-form__element " +
                                        (this.state.selected === index
                                            ? "debounced-form__element--selected"
                                            : "")
                                    }
                                    onClick={e => {
                                        this.setState({ input: element });
                                        this.onFormSubmit(e);
                                    }}
                                    key={index}
                                >
                                    {element}
                                </div>
                            );
                        })}
                    </div>
                )}
            </form>
        );
    }
}

DebouncedSearchInput.propTypes = {
    dataSource: PropTypes.func.isRequired,
    delay: PropTypes.number.isRequired,
    callback: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default DebouncedSearchInput;
