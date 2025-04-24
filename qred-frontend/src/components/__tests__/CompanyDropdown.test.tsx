import renderer from 'react-test-renderer';
import CompanyDropdown from '../CompanyDropdown';
import { User } from '../../models/models';

describe('CompanyDropdown Component', () => {
  it('renders correctly with no selected user', () => {
    const mockOnSelect = jest.fn();
    const tree = renderer
      .create(
        <CompanyDropdown onSelect={mockOnSelect} selectedUser={null} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a selected user', () => {
    const mockOnSelect = jest.fn();
    const mockUser: User = {
      id: 1, name: 'Test User',
      email: 'test@test.se'
    };
    const tree = renderer
      .create(
        <CompanyDropdown onSelect={mockOnSelect} selectedUser={mockUser} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});