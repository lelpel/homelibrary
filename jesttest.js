it('should show modal on click', () => {
  const output = shallow(<Add />);

  expect(output.state().showModal).toEqual(false);
  output.find('addButton').simulate('click');
  expect(output.state().showModal).toEqual(true);
});
